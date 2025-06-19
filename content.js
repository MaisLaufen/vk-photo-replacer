(function () {
  const API_VERSION = "5.253";
  const CLIENT_ID = "6287487";

  function addEditPhotoButton() {
    const container = document.querySelector(".pv_bottom_actions");
    if (!container || document.getElementById("vk-edit-photo-button")) return;

    const button = document.createElement("button");
    button.id = "vk-edit-photo-button";
    button.className = "FlatButton";
    button.style.marginLeft = "6px";
    button.innerHTML = `Изменить фото<span class="divider"></span>`;
    container.appendChild(button);

    button.addEventListener("click", async () => {
      const token = await getVkToken();
      if (!token) {
        alert("⛔️ Токен не найден. Пожалуйста, авторизуйтесь.");
        return;
      }
      showUploadDialog(token);
    });
  }

  function getVkToken() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
        resolve(response?.token || null);
      });
    });
  }

  function showUploadDialog(token) {
    document.getElementById("vk-upload-dialog")?.remove();

    const modal = document.createElement("div");
    modal.id = "vk-upload-dialog";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.zIndex = "10000";
    modal.style.backgroundColor = "#fff";
    modal.style.border = "1px solid #ccc";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    modal.innerHTML = `
      <h3>Выберите изображение</h3>
      <input type="file" accept="image/*" id="vk-photo-input" />
      <br><br>
      <button id="vk-upload-btn">Загрузить</button>
      <button id="vk-cancel-btn" style="margin-left: 10px;">Отмена</button>
    `;
    document.body.appendChild(modal);

    document.getElementById("vk-upload-btn").addEventListener("click", async () => {
      const fileInput = document.getElementById("vk-photo-input");
      const file = fileInput?.files[0];
      if (!file) return alert("⚠️ Выберите изображение.");

      try {
        const photoId = extractPhotoIdFromUrl();
        if (!photoId) throw new Error("Не удалось извлечь photo_id из URL");

        const uploadUrl = await getUploadUrl(token);
        const uploadData = await uploadImage(uploadUrl, file);
        const result = await savePhotoEditor(token, photoId, uploadData);

        alert("✅ Фото успешно обновлено!");
        modal.remove();
      } catch (err) {
        alert("❌ Ошибка: " + err.message);
      }
    });

    document.getElementById("vk-cancel-btn").addEventListener("click", () => {
      modal.remove();
    });
  }

  function extractPhotoIdFromUrl() {
    const match = window.location.href.match(/photo(\d+_\d+)/);
    return match ? match[1] : null;
  }

  async function getUploadUrl(token) {
    const url = `https://api.vk.com/method/photos.getPhotoEditorUploadServer?v=${API_VERSION}&client_id=${CLIENT_ID}&access_token=${token}`;
    const res = await fetch(url, { method: "POST" });
    const data = await res.json();
    if (data.error) throw new Error(data.error.error_msg);
    return data.response.upload_url;
  }

  async function uploadImage(uploadUrl, file) {
    const formData = new FormData();
    formData.append("file", file, "photo.jpg");

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.error_msg);
    return data;
  }

  async function savePhotoEditor(token, photoId, uploadData) {
    const url = `https://api.vk.com/method/photos.savePhotoEditor?v=${API_VERSION}&client_id=${CLIENT_ID}&access_token=${token}`;
    const form = new URLSearchParams();
    form.append("photo", photoId);
    form.append("response_json", JSON.stringify(uploadData));

    const res = await fetch(url, {
      method: "POST",
      body: form
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.error_msg);
    return data.response;
  }

  const observer = new MutationObserver(() => {
    const isPhotoPage = /photo\d+_\d+/.test(location.href);
    if (isPhotoPage) addEditPhotoButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();