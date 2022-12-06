'use strict'
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5


var gFilterBy = { bookName: '', }
var gPageIdx = 0
var gBooks
var gSortIsOn
var gBookNames = ['A Song of Ice and Fire', 'The Lord of The Rings', 'Dune']
var gActions = [
    { name: 'Read' },
    { name: 'Update' },
    { name: 'Delete' }
]

_createBooks()


function getActions() {
    return gActions
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getBooks() {
    const books = gBooks.filter(book =>
        book.name.toLowerCase().
            includes(gFilterBy.bookName.toLowerCase())
    )

    const startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(bookName) {
    const book = _createBook(bookName)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}



function setBookSort(sortBy = {}) {
    gPageIdx = 0
    if (sortBy.bookPrice) {
        gBooks.sort((c1, c2) => (c1.price - c2.price) * sortBy.bookPrice
        )
        gSortIsOn = !gSortIsOn
    }
}

function setBooksFilter(filterBy) {
    gFilterBy.bookName = filterBy
    return gFilterBy
}

function getFilterBy() {
    return gFilterBy
}

function _createBook(name) {
    return {
        id: makeId(),
        name,
        price: getRandomIntInclusive(25, 350),
        img: '',
        desc: makeLorem(100)
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 3; i++) {
            var bookName = gBookNames[i]
            books.push(_createBook(bookName))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
