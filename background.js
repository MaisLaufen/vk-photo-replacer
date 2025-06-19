chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url;

  if (url && url.includes("oauth.vk.com/blank.html") && changeInfo.status === "complete") {
    const hash = new URL(url).hash;
    const tokenMatch = hash.match(/access_token=([^&]+)/);

    if (tokenMatch) {
      const token = tokenMatch[1];

      chrome.storage.local.set({ vkToken: token }, () => {
        console.log("VK токен сохранён:", token);

        chrome.runtime.sendMessage({ type: "vkTokenSaved", token });

        chrome.tabs.remove(tabId);
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getToken") {
    chrome.storage.local.get(["vkToken"], (result) => {
      sendResponse({ token: result.vkToken || null });
    });
    return true;
  }
});