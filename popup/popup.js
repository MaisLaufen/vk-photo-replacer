document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("auth");
  const statusText = document.getElementById("status");

  chrome.storage.local.get(["vkToken"], (result) => {
    if (result.vkToken) {
      statusText.textContent = "Token getted";
      statusText.style.color = "green";
    } else {
      statusText.textContent = "No token";
      statusText.style.color = "red";
    }
  });

  authBtn.addEventListener("click", () => {
    const clientId = "6287487";
    const redirectUri = "https://oauth.vk.com/blank.html";
    const scope = "photos";
    const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

    chrome.tabs.create({ url: authUrl });
  });
});