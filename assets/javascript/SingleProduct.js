const URLPARAMS = new URLSearchParams(window.location.search)

const PATH = document.querySelector('.path')
const BIGIMAGE = document.querySelector('.product__displayedImage')
const TITLE = document.querySelector('.product__name')
const MORE = document.querySelector('.product__more')
const ABOUT = document.querySelector('.product__about')
const PRICE = document.querySelector('.product__price')
const COLORS = document.querySelector('.product__finishSection')
const GALLERY = document.querySelector('.product__galleryImages')
const PRODUCTLIST = document.querySelector('.product__list')
const SPECIFICATIONS = document.querySelector('.product__specifications')

TITLE.textContent = URLPARAMS.get('product')

fetch(`http://localhost:3000/products?name=${URLPARAMS.get('product')}`)
	.then(res => res.json())
	.then(data => {
		BIGIMAGE.src = data[0].pictures[0]

		PRICE.innerHTML = `
			<span class="product__discount">${data[0].discount}$</span>
			${data[0].price}$
		`

		ABOUT.textContent = data[0].description[0].text

		// sets all gallery images
		data[0].pictures.forEach(image => {
			const GALLERYIMAGE = document.createElement('img')
			GALLERYIMAGE.className = 'product__galleryImage'
			GALLERYIMAGE.src = image
			GALLERYIMAGE.alt = 'gallery image'

			GALLERYIMAGE.addEventListener('click', () => {
				BIGIMAGE.src = GALLERYIMAGE.src
			})

			GALLERY.append(GALLERYIMAGE)
		})

		// sets all colors
		data[0].color.forEach(color => {
			COLORS.innerHTML += `
			<label class="product__colorLabel" for="color">
				<input class="product__colorInput" type="radio" name="color">
				${color.name}
			</label>
			`
		})

		PRODUCTLIST.innerHTML = `
			<li class="product__item">
				<h2 class="product__subtitle product__value--capitalize">card surcharges</h2>
				<span class="product__value product__value--capitalize">${data[0]["card-surcharges"]}</span>
			</li>
			<li class="product__item">
				<h2 class="product__subtitle product__value--capitalize">delivery time</h2>
				<span class="product__value product__value--capitalize">${data[0].delivery[0].time}</span>
			</li>
			<li class="product__item">
				<h2 class="product__subtitle product__value--capitalize">delivery charge</h2>
				<span class="product__value product__value--capitalize">${data[0].delivery[0].charge}</span>
			</li>
			<li class="product__item">
				<h2 class="product__subtitle product__value--capitalize">free warranty</h2>
				<span class="product__value product__value--capitalize">${data[0].warranty}</span>
			</li>
		`

		SPECIFICATIONS.innerHTML = `
			<li class="product__specification">
				<span>power output (8/4 ohm rms)</span>
				<span>${data[0].description[0].technical[0]["power-output"]}</span>
			</li>
			<li class="product__specification">
				<span>frequency response</span>
				<span>${data[0].description[0].technical[0].frequency}</span>
			</li>
			<li class="product__specification">
				<span>total harmonic distortian</span>
				<span>${data[0].description[0].technical[0]["harmonic-distortion"]}</span>
			</li>
			<li class="product__specification">
				<span>damping factor</span>
				<span>${data[0].description[0].technical[0]["damping-factor"]}</span>
			</li>
			<li class="product__specification">
				<span>input sensitivity: mm</span>
				<span>${data[0].description[0].technical[0]["input-sensitivity"][0].mm}</span>
			</li>
			<li class="product__specification">
				<span>input sensitivity: mc</span>
				<span>${data[0].description[0].technical[0]["input-sensitivity"][0].mc}</span>
			</li>
			<li class="product__specification">
				<span>signal to noise ratio: mm / mc</span>
				<span>${data[0].description[0].technical[0]["signal-noise-ratio"][0].mm}</span>
			</li>
			<li class="product__specification">
				<span>input sensitivity: high level</span>
				<span>${data[0].description[0].technical[0]["input-sensitivity"][0]["high-level"]}</span>
			</li>
			<li class="product__specification">
				<span>input sensitivity: balanced high level</span>
				<span>${data[0].description[0].technical[0]["input-sensitivity"][0]["balanced-high-level"]}</span>
			</li>
			<li class="product__specification">
				<span>signal to noise ratio: high level</span>
				<span>${data[0].description[0].technical[0]["signal-noise-ratio"][0]["high-level"]}</span>
			</li>
			<li class="product__specification">
				<span>input sensitivity: power amp direct in</span>
				<span>${data[0].description[0].technical[0]["input-sensitivity"][0]["power-amp-direct-in"]}</span>
			</li>
			<li class="product__specification">
				<span>signal to noise ratio: power amp direct in</span>
				<span>${data[0].description[0].technical[0]["signal-noise-ratio"][0]["power-amp-direct-in"]}</span>
			</li>
		`

		// fetches categories
		fetch(data[0].categories[0].url)
			.then(res => res.json())
			.then(data => {
				PATH.innerHTML = `
					<span class="path__item">Home</span>
						/
					<span class="path__item">${data.name}</span>
						/
					<span class="path__item path__item--black">${URLPARAMS.get('product')}</span>
				`
			})

		// fetches manufacturer
		fetch(data[0].manufacturer[0].link)
			.then(res => res.json())
			.then(data => {
				MORE.textContent = `See other ${data.name} products`
				console.log('hello');
				PRODUCTLIST.innerHTML += `
					<li class="product__item">
						<h2 class="product__subtitle product__value--capitalize">manufacturer link</h2>
						<span class="product__value">${data.link}</span>
					</li>
					<li class="product__item" >
						<h2 class="product__subtitle product__value--capitalize">manufacturer</h2>
						<span class="product__value product__value--capitalize">${data.name}</span>
					</li>
				`
			})
	})