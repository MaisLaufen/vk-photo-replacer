document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("auth");
  const clearBtn = document.getElementById("clear");
  const statusText = document.getElementById("status");

  function updateTokenStatus() {
    chrome.storage.local.get(["vkToken"], (result) => {
      if (result.vkToken) {
        statusText.textContent = "✅ Токен получен";
        statusText.className = "status-ok";
        clearBtn.disabled = false;
      } else {
        statusText.textContent = "❌ Токен отсутствует";
        statusText.className = "status-error";
        clearBtn.disabled = true;
      }
    });
  }

  updateTokenStatus();

  authBtn.addEventListener("click", () => {
    const clientId = "6287487";
    const redirectUri = "https://oauth.vk.com/blank.html";
    const scope = "photos";
    const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

    chrome.tabs.create({ url: authUrl });
  });

  clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["vkToken"], updateTokenStatus);
  });
});