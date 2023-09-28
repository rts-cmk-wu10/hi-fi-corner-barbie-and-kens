const BRANDS = document.querySelector(".aboutBrands")

fetch("http://localhost:3000/manufacturers")
    .then(res => res.json())
    .then(data => {
    data.forEach(brand => {
        BRANDS.innerHTML += `
            <img class="aboutBrand__logo" src="${brand.logo}" alt="brand image">
        `
    });
    })