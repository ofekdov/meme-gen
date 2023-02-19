'use strict'

let gElCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    renderMeme()
    renderGallery()
    onOpenGallery()
}

function renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const memeLines = meme.lines

    if(meme.loadImg) renderLoadImage(meme.loadImg)
    else renderImg(imgId)

    memeLines.forEach((line, idx) => {
        drawText(line.x, line.y, line.size, line.color, line.txt, line.font)
        if (idx === meme.selectedLineIdx) drawBorderRectLine(line.x, line.y, line.size, line.txt)
    })
}

function renderMemeForDownLoad() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const memeLines = meme.lines

    if(meme.img) renderLoadImage(meme.img)
    else renderImg(imgId)

    memeLines.forEach(line => {
        drawText(line.x, line.y, line.size, line.color, line.txt, line.font)
    })
}

function renderImg(imgId) {
    const img = new Image() // Create a new html img element
    img.src = `images/${imgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSwitchLine() {
    switchLine()
    setTextInInput()
    renderMeme()
}

function setTextInInput() { //when switching lines it sets the text in the line to the input
    document.querySelector('[name="txt"]').value = getCurrLineText()
}

function onSetLineProp() {   // give you the live text that you get on the input 
    const elInputTxt = document.querySelector('[name="txt"]').value
    const elInputColor = document.querySelector('[name="txt-color"]').value
    const elInputSize = document.querySelector('[name="txt-size"]').value
    setLineTxt(elInputTxt)
    setLineColor(elInputColor)
    setLineSize(elInputSize)
    renderTxtSize(elInputSize)
    renderMeme()
}

function renderTxtSize(sizeNum) { // render the size of the text on every input
    const elSpan = document.querySelector('.txt-size-number')
    elSpan.innerHTML = sizeNum
}

function drawText(x, y, size, color, txt, font) {
    // gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    // resizeCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    isTextClicked(pos)

    // setCircleDrag(true)
    //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    onCloseGallery()
}

// *********** arrow functions ************//

function onArrowUp() {
    arrowUp()
    renderMeme()
}

function onArrowDown() {
    arrowDown()
    renderMeme()
}

function onArrowRight() {
    arrowRight()
    renderMeme()
}

function onArrowLeft() {
    arrowLeft()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
    document.querySelector('[name="txt"]').value = '' //delete the txt i  input when delete a line
}

function onAddLine() {
    addLine()
    renderMeme()
    document.querySelector('[name="txt"]').value = ''
}

function onLogoClick() { // get back to memes editor
    onCloseGallery()
}

function onFontChange() {
    const elSelect = document.querySelector('[name="txt-font"]').value
    fontChange(elSelect)
    renderMeme()
}

function drawBorderRectLine(x, y, size, txt) { // create the border of the text 
    if (txt === '') return
    gCtx.strokeStyle = 'grey'
    let txtWidthLength = gCtx.measureText(txt).width
    let txtHeightLength = size * 1.286
    let xDiff = x - txtWidthLength / 2 - 10
    let yDiff = y - txtHeightLength / 2

    gCtx.strokeRect(xDiff, yDiff, txtWidthLength + 20, txtHeightLength)
}

function isTextClicked(clickedPos) {
    var lineClickedIdx
    let meme = getMeme()
    meme.lines.forEach((line, idx) => {
        let lineWidth = gCtx.measureText(line.txt).width
        let lineHeight = line.size * 1.286

        let lineXDiff = line.x - lineWidth / 2 - 10
        let lineYDiff = line.y - lineHeight / 2
        // checks if clicked pos is on the line
        if (clickedPos.x < lineXDiff || clickedPos.x > line.x + lineWidth) return
        if (clickedPos.y < lineYDiff - 10 || clickedPos.y > line.y + lineHeight) return
        lineClickedIdx = idx

    })
    textClicked(lineClickedIdx)
    renderMeme()
}

function onSaveMeme() {
    flashMsg('meme saved')
    let meme = {...gMeme, dataUrl: gElCanvas.toDataURL('image/jpeg')}
    console.log('meme',meme)
    saveMemeToStorage(meme)
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg');
    el.innerText = msg;
    el.classList.add('open');
    setTimeout(() => {
        el.classList.remove('open');
    }, 3000);
}





