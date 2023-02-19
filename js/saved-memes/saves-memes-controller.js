

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    // if (savedMemes === []) return

    var strHtmls = savedMemes.map((meme,idx) => {
        return `<img onclick="onMemeSelect(this)" data-id="${idx}" src="${meme.dataUrl}"></img>`
    }).join('')

    
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHtmls
}

function onMemeSelect(elMeme) {
    let savedMemes = getSavedMemes()
    changeGMemeToStorageMeme(savedMemes[elMeme.dataset.id])
    renderMeme()
    onCloseSavedGallery()
}

function onOpenSavedGallery() {
    onCloseGallery()
    renderSavedMemes()
    const elGallery = document.querySelector('.gallery')
    elGallery.style.opacity = 1
    elGallery.style.pointerEvents = 'auto'
    document.body.classList.remove('menu-open');

    const elGalleryBtn = document.querySelector('.saved-memes-btn')
    elGalleryBtn.classList.add('active')

    const elMainContent = document.querySelector('.main-content')
    elMainContent.classList.add('hide')
}

function onCloseSavedGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.opacity = 0
    elGallery.style.pointerEvents = 'none'

    const elGalleryBtn = document.querySelector('.saved-memes-btn')
    elGalleryBtn.classList.remove('active')

    const elMainContent = document.querySelector('.main-content')
    elMainContent.classList.remove('hide')
}

