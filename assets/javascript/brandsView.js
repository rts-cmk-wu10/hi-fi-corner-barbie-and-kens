const BRANDS = document.querySelector(".brands__leftCtn")

fetch("http://localhost:3000/manufacturers")
    .then(res => res.json())
    .then(data => {
    data.forEach(brand => {
        BRANDS.innerHTML += `
            <img class="brand__logo" src="${brand.logo}" alt="brand image">
        `
    });
    })