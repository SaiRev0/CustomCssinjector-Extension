chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cssRules: [] });
});
