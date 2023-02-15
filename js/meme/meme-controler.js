'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()

    // addListeners()

    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const memeLines = meme.lines

    renderImg(imgId)

    memeLines.forEach(line => {
        drawText(150, 150, line.size, line.color, line.txt)
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
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'

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
    // addMouseListeners()
    // addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
      resizeCanvas()
    })
  }
  
  function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
  }
  
  function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
  }

  function onToggleMenu() {
    document.body.classList.toggle('menu-open');
  }