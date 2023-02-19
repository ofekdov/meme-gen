'use strict'

function onImgInput(ev) {
    loadImageFromInput(ev, renderLoadImage)
    onCloseGallery()
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderLoadImage(img) {
    // const img1 = new Image() // Create a new html img element
    // img.src = `images/loadImg.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    saveImgInMeme(img)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}