document.getElementById("auth").addEventListener("click", () => {
  const clientId = "6287487";
  const redirectUri = "https://oauth.vk.com/blank.html"; 
  const scope = "photos";
  const authUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

  chrome.tabs.create({ url: authUrl });
});