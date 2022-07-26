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

let specialKeys = { "MetaLeft": false, "MetaRight": false, "AltLeft": false, "AltRight": false, "ControlLeft": false, "ControlRight": false, "Tab": false }

function handleSpecialKeyDown(e) {
    if (!(e.code in specialKeys)) {
        return
    }
    specialKeys[e.code] = true
}

function handleSpecialKeyUp(e) {
    if (!(e.code in specialKeys)) {
        return
    }
    specialKeys[e.code] = false
}

function specialKeyPressed() {
    return Object.values(specialKeys).includes(true)
}

function keyDown(e) {
    handleSpecialKeyDown(e)
    if (specialKeyPressed()) {
        console.log('special key is pressed')
        return
    }
    chrome.storage.sync.get("emojis", ({ emojis }) => {
        let k = emojis[e.code]
        if (k){
            showEmoji(k)
        }
    })
}

function keyUp(e) {
    handleSpecialKeyUp(e)
}

document.querySelector("iframe").contentDocument.addEventListener('keydown', keyDown);
document.querySelector("iframe").contentDocument.addEventListener('keyup', keyUp);
