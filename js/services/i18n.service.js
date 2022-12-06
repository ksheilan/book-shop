var gTrans = {
    lang: {
        en: 'Language',
        es: 'idioma',
        he: 'שפה'
    },
    header:{
        en: 'Welcome to my bookshop',
        es: 'Bienvenido a mi librería',
        he: 'ברוכים הבאים לחנות ספרים שלי'
    },
    'new-book':{
        en: 'Create new book',
        es: 'Crear nuevo libro',
        he: 'צור ספר חדש'
    },
    title: {
        en: 'Title',
        es: 'título',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        es: 'precio',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        es: 'comportamiento',
        he: 'פעולות'
    },
    read: {
        en: 'Read',
        es: 'leer',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        es: 'actualizar',
        he: 'עדכן'
    },
    delete:{
        en: 'Delete',
        es: 'borrar',
        he: 'מחק'
    },
    'new-bookname':{
        en: 'Enter book name',
        es: 'Crear nuevo libro',
        he: 'הכנס שם ספר'
    },
    'new-price':{
        en: 'Enter price',
        es: 'introducir precio',
        he: 'הכנס מחיר'
    },
    book: {
        en: 'Book',
        es: 'libro',
        he: 'ספר'
    },
    desc: {
        en: 'Dsecription',
        es: 'descripción',
        he: 'תיאור'
    },
    close: {
        en: 'Close',
        es: 'cerca',
        he: 'סגור'
    },
    'search-book':{
        en: 'Search a book...',
        es: 'buscar un libro...',
        he: 'חפש ספר...'
    }
    
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}




function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
