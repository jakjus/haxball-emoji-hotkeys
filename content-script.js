let uniq = 0;

function setAvatar(av) {
  document.querySelector("iframe").contentDocument.querySelector("body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.input > input[type=text]").value='/avatar '+av
  document.querySelector("iframe").contentDocument.querySelector("body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.input > button").click()
  Array.from(document.querySelector("iframe").contentDocument.querySelectorAll('body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.log > p.notice')).filter(d => d.innerText == "Avatar set").map(d => d.remove())
  uniq++
  return uniq
}

function removeAvatar(myCounter) {
  if (uniq !== myCounter) return
  chrome.storage.sync.get("defaultEmoji", ({ defaultEmoji }) => {
    document.querySelector("iframe").contentDocument.querySelector("body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.input > input[type=text]").value='/avatar '+defaultEmoji
    document.querySelector("iframe").contentDocument.querySelector("body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.input > button").click()
    Array.from(document.querySelector("iframe").contentDocument.querySelectorAll('body > div:nth-child(1) > div > div.bottom-section > div.chatbox-view > div.log > p.notice')).filter(d => d.innerText == "Avatar set").map(d => d.remove())
  })
}

function showEmoji(av) {
    let counter = setAvatar(av)
    setTimeout(removeAvatar, 1300, counter)
}

function logKey(e) {
  chrome.storage.sync.get("emojis", ({ emojis }) => {
    let k = emojis[e.code]
    if (k){
      showEmoji(k)
    }
  })
}

document.querySelector("iframe").contentDocument.addEventListener('keydown', logKey);
