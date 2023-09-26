const PRODUCTS = document.querySelector('.shop__items--container')
const MANUFACTURERS = document.querySelector('.shop__shopByMenu')
const CATEGORIES = document.querySelector('.shop__categoryMenu')

const URLPARAMS = new URLSearchParams(window.location.search)

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

            MANUFACTURERS.append(ELEMENT)
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
            const ELEMENT = document.createElement('div')
            ELEMENT.className = 'shop__items'

            ELEMENT.innerHTML = `
                <a href="hifi-single-product.html?product=${product.name}">
                    <img class="shop__items__image" src="${product.pictures[0]}" alt="product image">
                    <h3 class="shop__items__title">${product.name}</h3>
                    <p class="shop__items__price">${product.price}$</p>
                    <button class="shop__items__button">Add to cart</button>
                </a>
            `

            // checks what content needs to be loaded depending on the URl search params
            if (URLPARAMS.has('category')) {
                fetch(product.categories[0].url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.name === URLPARAMS.get('category')) {
                            PRODUCTS.append(ELEMENT)
                        }
                    })
            } else if (URLPARAMS.has('manufacturer')) {
                fetch(product.manufacturer[0].link)
                    .then(res => res.json())
                    .then(data => {
                        if (data.name === URLPARAMS.get('manufacturer')) {
                            PRODUCTS.append(ELEMENT)
                        }
                    })
            } else {
                PRODUCTS.append(ELEMENT)
            }
        })
    })