'use strict'
const ARROW_UP = '&#8593';
const ARROW_DOWN = '&#8595';

function onInit() {
    // renderVendors()
    renderFilterByQueryStringParams()
    doTrans()
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(book => `
    <tr>
        <td scope="row" class="text-center">${book.id}</td>
        <td>${book.name}</td>
        <td class="text-center">${book.price}$</td>
        <td class="actions-cell text-center">
            <button class="btn btn-success bg-gradient" onclick="onReadBook('${book.id}')"}>${getTrans('read')}</button>
            <button class="btn btn-warning bg-gradient" onclick="onUpdateBook('${book.id}')"}>${getTrans('update')}</button>
            <button class="btn btn-danger bg-gradient" onclick="onDeleteBook('${book.id}')"}>${getTrans('delete')}</button>
        </td>
    </tr> 
        `
    )
    document.querySelector('.book-container').innerHTML = strHtmls.join('')

    doTrans()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt(getTrans('new-price'), book.price)
    if (newPrice && book.price !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
    }
}

function onAddBook() {
    var bookName = prompt(getTrans('new-bookname'))
    if (bookName) {
        const book = addBook(bookName)
        renderBooks()
        // flashMsg(`Car Added (id: ${car.id})`)
    }
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    var elModalHeader = document.querySelector('.modal-content')
    const strHTML = `
    <div class="modal-header">
        <div>
            <p class="blockquote">${getTrans('title')}:&nbsp${book.name}</p>
            <p class="blockquote">${getTrans('price')}:&nbsp${book.price}&#36</p>
            
        </div>
    </div>
    <div class="modal-body">
        <div>
            <p class="book-desc">${book.desc}</p>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-info bg-gradient" data-bs-dismiss="modal"
        onclick="onCloseModal()">${getTrans('close')}</button>
    </div>
    `
    elModalHeader.innerHTML = strHTML
    // elModal.querySelector('.book-name').innerText = book.name
    // elModal.querySelector('.book-price').innerText = book.price
    // elModal.querySelector('.book-desc').innerText = book.desc
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onSetLang(lang) {
    setLang(lang)
    // done: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl')
    }
    else document.body.classList.remove('rtl')

    renderBooks()

}

function onKeyUpSearch() {
    setTimeout(() => {
        const searchStr = document.querySelector('.search-box').value
        if (!searchStr) document.querySelector('.search-box').classList.add('w-25')
        const filterBy = setBooksFilter(searchStr)
        renderBooks()
        document.querySelector('.search-box').value = searchStr

        const queryStringParams = `?bookName=${filterBy.bookName}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }, 1500);
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = { bookName: queryStringParams.get('bookName') || '' }
    if (!filterBy.bookName) return

    setBooksFilter(filterBy.bookName)
}

function onSetSortBy(sortName) {
    const prop = sortName
    const sortBy = {}

    sortBy[prop] = (gSortIsOn) ? -1 : 1
    var elSortArrow
    
    switch (sortName) {
        case 'bookName': 
        console.log('sortName', sortName);
        elSortArrow = document.querySelector('.title-sort-arrow')
        break

        case 'bookPrice': 
        elSortArrow = document.querySelector('.price-sort-arrow')
        break
    }
    console.log('elSortArrow', elSortArrow);
    elSortArrow.innerHTML = gSortIsOn ? ARROW_DOWN : ARROW_UP
    setBookSort(sortBy)
    renderBooks()
}

function onSearchInputClick(){
    const elSearchInput = document.querySelector('.search-box')
    console.log('elSearchInput style', elSearchInput.style);
    elSearchInput.classList.remove('w-25')
    elSearchInput.style.transition = 'width 0.5s'
}