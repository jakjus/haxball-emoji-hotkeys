let emojis = {'KeyA': '👏'}
let defaultEmoji = '😊'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ emojis });
  chrome.storage.sync.set({ defaultEmoji });
});
