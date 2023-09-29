const PATH = document.querySelector('.website__path')
const PRODUCTS = document.querySelector('.shop__items--container')
const CATEGORIES = document.querySelector('.shopCategory__menu')
const MANUFACTURERS = document.querySelector('.shop__shopByMenu')
const VIEWMANUFACTURES = document.querySelector('.shopManufacturer__item')
const ITEMCOUNT = document.querySelectorAll('.shopFilter__showingItemsResult')

const URLPARAMS = new URLSearchParams(window.location.search)

if (URLPARAMS.has('category')) {
    PATH.innerHTML += `
        /
        <span>${URLPARAMS.get('category')}</span>
    `
}

function itemCount(list, increment) {
    Array.from(list).forEach(counterElement => {
        counterElement.textContent = Number(counterElement.textContent) + increment;
    })
}

// displays all manufactures
fetch('http://localhost:3000/manufacturers')
    .then(res => res.json())
    .then(data => {
        data.forEach(manufacturer => {
            const ELEMENT = document.createElement('li')
            ELEMENT.className = 'shop__shopByItem'

            ELEMENT.textContent = manufacturer.name

            ELEMENT.addEventListener('click', () => {
                window.location.href = `?manufacturer=${manufacturer.name}`
            })

            VIEWMANUFACTURES.append(ELEMENT)
            MANUFACTURERS.innerHTML += `
                <li class="shop__shopByItem">${manufacturer.name} (${Math.floor(Math.random() * 5)})</li>
            `
        })
    })

// displays all categories
fetch('http://localhost:3000/categories')
    .then(res => res.json())
    .then(data => {
        data.forEach(category => {
            const ELEMENT = document.createElement('li')
            ELEMENT.className = 'shop__categoryItem'

            ELEMENT.textContent = category.name

            ELEMENT.addEventListener('click', () => {
                window.location.href = `?category=${category.name}`
            })

            CATEGORIES.append(ELEMENT)
        })
    })

// displays all filtered products
fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            const ELEMENT = document.createElement('a')
            ELEMENT.className = 'shopItems__containerLink'
            ELEMENT.href = 'hifi-single-product.html?product=' + product.name

            ELEMENT.innerHTML = `
                <img class="shopItems__image" src="${product.pictures[0]}" alt="product image">
                <h3 class="shopItems__title">${product.name}</h3>
                <p class="shopItems__price">${product.price}$</p>
                <button class="shopItems__button">Add to cart</button>
            `

            // checks what content needs to be loaded depending on the URl search params
            if (URLPARAMS.has('category')) {
                fetch(product.categories[0].url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.name === URLPARAMS.get('category')) {
                            PRODUCTS.append(ELEMENT)
                            itemCount(ITEMCOUNT, 1)
                        }
                    })
            } else if (URLPARAMS.has('manufacturer')) {
                fetch(product.manufacturer[0].link)
                    .then(res => res.json())
                    .then(data => {
                        if (data.name === URLPARAMS.get('manufacturer')) {
                            PRODUCTS.append(ELEMENT)
                            itemCount(ITEMCOUNT, 1)
                        }
                    })
            } else {
                PRODUCTS.append(ELEMENT)
                itemCount(ITEMCOUNT, 1)
            }
        })
    })