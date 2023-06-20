let burgurIcon = document.getElementById('brg-icon');
let closeIcon = document.getElementById('close');
let navLinks = document.getElementById('nav-links');

if (burgurIcon) {
    burgurIcon.addEventListener('click', () => {
        navLinks.classList.add('active');
    })
}

if (closeIcon) {
    closeIcon.addEventListener('click', () => {
        navLinks.classList.remove('active');
    })
}



async function getFeutredProductsData() {
    const jsonFile = "/json/shopProducts.json";
    const respone = await fetch(jsonFile);
    const responeData = await respone.json();
    const rate = await responeData["productRate"];

    createAllProduct(responeData);

    let productBox = document.querySelectorAll('.products-area .box');
    productBox.forEach((box) => {
        box.onclick = function () {
            
            window.location.href = '/singleProduct.html'
        }
    })

}
getFeutredProductsData();



function createAllProduct(data) {

    for (let i = 0; i < data.length; i++) {
        let productsArea = document.querySelector('#shop-products .products-area');
        let productsBox = document.createElement('div');
        productsBox.className = 'box my-1';

        /* product image  */
        let pImg = document.createElement('div');
        pImg.className = 'product-img text-center';
        let image = document.createElement('img');
        image.src = data[i]["productImg"];
        pImg.appendChild(image);

        /* product info, Brand */
        let pinfo = document.createElement('div');
        pinfo.className = 'product-info my-05';
        let pBrand = document.createElement('p');
        pBrand.className = 'paragraph';
        pBrand.innerHTML = data[i]['productInfo']['brand'];
        pinfo.appendChild(pBrand)

        /* product info, title */
        let ptitle = document.createElement('h4');
        ptitle.className = 'title';
        ptitle.innerHTML = data[i]['productInfo']['pName'];
        pinfo.appendChild(ptitle);

        // product Rate 
        let pRate = document.createElement('div');
        pRate.className = 'product-rate';
        if (data[i]['productRate'] === 5) {
            for (let j = 0; j < 5; j++) {
                let stars = document.createElement('i');
                stars.className = 'fa-solid fa-star';
                stars.style.color = "#FEBE00";
                pRate.appendChild(stars);
            }
        } else if (data[i]['productRate'] === 4) {
            for (let j = 0; j < 4; j++) {
                let stars = document.createElement('i');
                stars.className = 'fa-solid fa-star';
                stars.style.color = "#FEBE00";
                pRate.appendChild(stars);
            }
        } else if (data[i]['productRate'] === 3) {
            for (let j = 0; j < 3; j++) {
                let stars = document.createElement('i');
                stars.className = 'fa-solid fa-star';
                stars.style.color = "#FEBE00";
                pRate.appendChild(stars);
            }
        }

        /* Product price */
        let pPrice = document.createElement('div');
        pPrice.className = 'product-purchase flex my-05';
        let price = document.createElement('span');
        price.className = 'price fs-250 secondary-text-clr fw-700';
        price.innerHTML = data[i]['productPrice'];
        pPrice.appendChild(price);
        let cartIconDiv = document.createElement('div');
        cartIconDiv.className = 'cart-icon';
        cartIconDiv.dataset.flow = 'bottom';

        let toolTip = document.createElement('span');
        toolTip.className = 'tooltip';
        toolTip.innerHTML = "Add To Cart";
        cartIconDiv.appendChild(toolTip);

        let icon = document.createElement('i');
        icon.className = 'fa-solid fa-cart-shopping';
        cartIconDiv.appendChild(icon);

        pPrice.appendChild(cartIconDiv);


        productsBox.appendChild(pImg);
        productsBox.appendChild(pinfo);
        productsBox.appendChild(pRate);
        productsBox.appendChild(pPrice);

        // Append to Website
        productsArea.appendChild(productsBox);
    }
}