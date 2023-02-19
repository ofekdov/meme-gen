const STORAGE_KEY = 'savedMemesDB';

function getSavedMemes() {
    let savedMemes = loadFromStorage(STORAGE_KEY)
    if (!savedMemes || savedMemes.lenght<1) {
        savedMemes = []
    }
    saveToStorage(STORAGE_KEY,savedMemes)
    return savedMemes
}

function saveMemeToStorage(meme) {
    let savedMemes = getSavedMemes()
    savedMemes.push(meme)
    saveToStorage(STORAGE_KEY,savedMemes)
}



//////// local storage /////////
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}