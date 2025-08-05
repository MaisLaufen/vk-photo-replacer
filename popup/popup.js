document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("auth");
  const clearBtn = document.getElementById("clear");
  const statusText = document.getElementById("status");

  // Проверка токена при открытии popup
  chrome.storage.local.get(["vkToken"], (result) => {
    if (result.vkToken) {
      statusText.textContent = "Token saved";
    } else {
      statusText.textContent = "No token";
    }
  });

  // Авторизация
  authBtn.addEventListener("click", () => {
    const clientId = "6287487";
    const redirectUri = "https://oauth.vk.com/blank.html";
    const scope = "photos";
    const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

    chrome.tabs.create({ url: authUrl });
  });

  // Очистка токена
  clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["vkToken"], () => {
      statusText.textContent = "Token cleared";
    });
  });
});