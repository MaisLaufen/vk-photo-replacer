chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url;

  if (url && url.includes("oauth.vk.com/blank.html") && changeInfo.status === "complete") {
    const hash = new URL(url).hash;
    const tokenMatch = hash.match(/access_token=([^&]+)/);

    if (tokenMatch) {
      const token = tokenMatch[1];

      // Сохраняем токен
      chrome.storage.local.set({ vkToken: token }, () => {
        console.log("VK токен сохранён:", token);

        // Можно отправить сообщение во все вкладки расширения (например, popup)
        chrome.runtime.sendMessage({ type: "vkTokenSaved", token });

        // Закрываем вкладку с oauth.vk.com, если нужно
        chrome.tabs.remove(tabId);
      });
    }
  }
});