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
  document.getElementById("vk-upload-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "vk-upload-overlay";
  overlay.style = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 9998;
  `;
  document.body.appendChild(overlay);

  const modal = document.createElement("div");
  modal.id = "vk-upload-dialog";
  modal.innerHTML = uploadDialogHTML;
  document.body.appendChild(modal);

  const style = document.createElement("style");
  style.textContent = uploadDialogCSS;
  document.head.appendChild(style);

  document.addEventListener("change", (e) => {
  if (e.target.id === "vk-photo-input") {
    const file = e.target.files[0];
    if (file) {
      const previewContainer = document.querySelector(".vk-photo-preview-container");
      const previewImg = document.getElementById("vk-photo-preview");
      previewImg.src = URL.createObjectURL(file);
      previewContainer.style.display = "block";
    }
  }
});

  const closeModal = () => {
    modal.remove();
    overlay.remove();
  };

  document.querySelector(".vk-upload-close-btn").onclick = closeModal;
  document.getElementById("vk-cancel-btn").onclick = closeModal;

  document.getElementById("vk-upload-btn").addEventListener("click", async () => {
    const fileInput = document.getElementById("vk-photo-input");
    const file = fileInput?.files[0];
    if (!file) return alert("⚠️ Выберите изображение.");

    try {
      document.querySelector(".vk-loading").style.display = "flex";

      const photoId = extractPhotoIdFromUrl();
      if (!photoId) throw new Error("Не удалось извлечь photo_id из URL");

      const uploadUrl = await getUploadUrl(token);
      const uploadData = await uploadImage(uploadUrl, file);
      await savePhotoEditor(token, photoId, uploadData);

      alert("✅ Фото успешно обновлено!");
      closeModal();
      location.reload();
    } catch (err) {
      alert("❌ Ошибка: " + err.message);
      document.querySelector(".vk-loading").style.display = "none";
    }
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
