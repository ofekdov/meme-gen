'use strict'

// renderGallery()
function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHtml = `
    <img onclick="onImgSelect(this)" data-id="1" src="images/1.jpg">
    <img onclick="onImgSelect(this)" data-id="2" src="images/2.jpg">
    <img onclick="onImgSelect(this)" data-id="3" src="images/3.jpg">
    `
    elGallery.innerHTML = strHtml
}

function onImgSelect(el) {
    const imgId = el.dataset.id
    setImg(imgId)
    renderMeme()
}