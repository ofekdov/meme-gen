'use strict'

// renderGallery()
function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHtml = `
    <div class="file-input">
        <input type="file" class="file-input btn" id="file" onchange="onImgInput(event)">
        <label for="file" title="upload image"><i class="fa-regular fa-image"></i></label>
    </div>
    <img onclick="onImgSelect(this)" data-id="1" src="images/1.jpg">
    <img onclick="onImgSelect(this)" data-id="2" src="images/2.jpg">
    <img onclick="onImgSelect(this)" data-id="3" src="images/3.jpg">
    <img onclick="onImgSelect(this)" data-id="4" src="images/4.jpg">
    <img onclick="onImgSelect(this)" data-id="5" src="images/5.jpg">
    <img onclick="onImgSelect(this)" data-id="6" src="images/6.jpg">
    <img onclick="onImgSelect(this)" data-id="7" src="images/7.jpg">
    <img onclick="onImgSelect(this)" data-id="8" src="images/8.jpg">
    <img onclick="onImgSelect(this)" data-id="9" src="images/9.jpg">
    <img onclick="onImgSelect(this)" data-id="10" src="images/10.jpg">
    <img onclick="onImgSelect(this)" data-id="11" src="images/11.jpg">
    <img onclick="onImgSelect(this)" data-id="12" src="images/12.jpg">
    <img onclick="onImgSelect(this)" data-id="13" src="images/13.jpg">
    <img onclick="onImgSelect(this)" data-id="14" src="images/14.jpg">
    <img onclick="onImgSelect(this)" data-id="15" src="images/15.jpg">
    <img onclick="onImgSelect(this)" data-id="16" src="images/16.jpg">
    <img onclick="onImgSelect(this)" data-id="17" src="images/17.jpg">
    <img onclick="onImgSelect(this)" data-id="18" src="images/18.jpg">
    `
    elGallery.innerHTML = strHtml
}

function onOpenGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.opacity = 1
    elGallery.style.pointerEvents = 'auto'

    document.body.classList.remove('menu-open');
}

function onCloseGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.opacity = 0
    elGallery.style.pointerEvents = 'none'
}

function onImgSelect(el) {
    const imgId = el.dataset.id
    onCloseGallery()
    setImg(imgId)
    renderMeme()
}