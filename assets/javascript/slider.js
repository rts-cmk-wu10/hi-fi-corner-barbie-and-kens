const TEXT = document.querySelector('.slider__heading')
const IMAGE = document.querySelector('.slider__img')
const FORWARD = document.querySelector('.slider__forward')
const BACK = document.querySelector('.slider__back')

function changeElement(src, text) {
	IMAGE.src = src
	TEXT.textContent = text
}

// adds functionality to the slider
fetch('http://localhost:3000/products')
	.then(res => res.json())
	.then(data => {
		FORWARD.addEventListener('click', () => {
			const currentIndex = Number(IMAGE.dataset.index)

			IMAGE.dataset.index = (currentIndex < 34) ? currentIndex + 1 : 34

			changeElement(data[IMAGE.dataset.index].pictures[0], data[IMAGE.dataset.index].name)
		})

		BACK.addEventListener('click', () => {
			const currentIndex = Number(IMAGE.dataset.index)

			IMAGE.dataset.index = (currentIndex > 0) ? currentIndex - 1 : 0

			changeElement(data[IMAGE.dataset.index].pictures[0], data[IMAGE.dataset.index].name)
		})
	})