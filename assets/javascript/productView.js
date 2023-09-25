const ITEMS = document.querySelector('.shop__items--container')
const MANUFACTURERS = document.querySelector('.shop__manufacturerList')

fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            const ELEMENT = document.createElement('div')
            ELEMENT.className = 'shop__items'

            ELEMENT.innerHTML = `
                <a href="#">
                    <img class="shop__items__image" src="${product.pictures[0]}" alt="product image">
                    <h3 class="shop__items__title">${product.name}</h3>
                    <p class="shop__items__price">${product.price}</p>
                    <button class="shop__items__button">Add to cart</button>
                </a>
            `

            ITEMS.append(ELEMENT)
        })
    })

fetch('http://localhost:3000/manufacturers')
    .then(res => res.json())
    .then(data => {
        data.forEach(manufacturer => {
            const ELEMENT = document.createElement('li')
            ELEMENT.className = 'shop__manufacturer__list'

            ELEMENT.textContent = manufacturer.name

            MANUFACTURERS.prepend(ELEMENT)
        })
    })