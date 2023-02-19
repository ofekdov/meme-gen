'use strict'


var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'images/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'images/3.jpg', keywords: ['funny', 'dog'] }
]
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'white',
            x: 150,
            y: 100,
            font:'impact'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const memeLines = gMeme.lines
    const currLineIdx = gMeme.selectedLineIdx
    memeLines[currLineIdx].txt = text
}

function setLineColor(color) {
    const memeLines = gMeme.lines
    const currLineIdx = gMeme.selectedLineIdx
    memeLines[currLineIdx].color = color
}
function setLineSize(size) {
    const memeLines = gMeme.lines
    const currLineIdx = gMeme.selectedLineIdx
    memeLines[currLineIdx].size = size
}

function setImg(imgId) { //set the selected img on the gMeme
    gMeme.selectedImgId = imgId
    gMeme['loadImg'] = null
}

function switchLine() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = (currLineIdx === gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0 : ++gMeme.selectedLineIdx
}

function getCurrLineText() { //return the current line txt 
    const currLineIdx = gMeme.selectedLineIdx
    console.log('currLineIdx',currLineIdx)
    return gMeme.lines[currLineIdx].txt
}

// *********** arrow functions ************//

function arrowUp() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].y -= 8
}

function arrowDown() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].y += 8
}

function arrowLeft() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].x -= 8
}

function arrowRight() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].x += 8
}

function deleteLine() {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(currLineIdx,1)
    if(gMeme.lines.length===0) addLine()
    gMeme.selectedLineIdx=(gMeme.selectedLineIdx===0)? 0:gMeme.selectedLineIdx-1
}

function addLine() {
    let line = {
        txt: '  ',
        size: 40,
        align: 'left',
        color: 'white',
        x: 150,
        y: 180,
        font:'impact'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx+=1
}

function fontChange(font) {
    const currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].font = font
}

function textClicked(idx) {
    gMeme.selectedLineIdx = idx
}

function saveImgInMeme(img) {
    gMeme['loadImg'] = img
}

function changeGMemeToStorageMeme(meme) {
    gMeme = meme
    document.querySelector('[name="txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
}



