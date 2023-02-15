'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'images/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'images/3.jpg', keywords: ['funny', 'dog'] }
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 10,
            align: 'left',
            color: 'red'
        },
        {
            txt: '',
            size: 10,
            align: 'left',
            color: 'red'
        },
        {
            txt: '',
            size: 10,
            align: 'left',
            color: 'red'
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
}

function switchLine() {
    const currLineIdx = gMeme.selectedLineIdx 
    gMeme.selectedLineIdx = (currLineIdx===gMeme.lines.length-1)? gMeme.selectedLineIdx=0 : ++gMeme.selectedLineIdx
}

function getCurrLineText() { //return the current line txt 
    const currLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[currLineIdx].txt
}