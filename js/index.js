


/* active class on navigation bar */
let navLink = document.querySelectorAll('.nav-links li a'); 


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

// Selectors 
const productArea = document.querySelector('#f-products .products-area');
const cartList = document.querySelector('.cart-list'); 
const cartTotalValue = document.getElementById('cart-total-value'); 
const cartCountInfo = document.getElementById('cart-count-info');
const productDetailList = document.querySelector('#product-detail .product-detail-list'); 






const productSize = document.querySelectorAll('.product-detail-text .product-size span'); 

/* Show/Hide cart container*/
let cartContainer = document.querySelector('.cart-container'); 
let cartItemID = 1 ;
let productDetailItemID = 1 ; 

eventListener(); 




function eventListener() {
    // The "DOMContentLoaded" event fires when the DOM content is loaded, 
    // without waiting for images and stylesheets to finish loading.
    // Only handle DOMContentLoaded event if you place the JavaScript code in the head, 
    // which references elements in the body section.
    window.addEventListener('DOMContentLoaded', () => {
        fProductLoadJson(); 
        newProductLoadJson(); 
        loadCart(); 
    }); 

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container')
    }); 

    // add to cart
    productArea.addEventListener('click', purchaseProduct); 

    // delete from cart
    cartList.addEventListener('click', deleteProduct);

    // add product detail to product deatil container 
    productArea.addEventListener('click', displayDetail);

    // 
    productDetailList.addEventListener('click', ProductGallery)

    productSize.forEach((size) => {
        size.addEventListener('click', () => {
            productSize.forEach((size) => {
                size.classList.remove("sizeChecked")
            });
            size.classList.add('sizeChecked');
        })
    })
}



//update cart info
function updateCartInfo () {
    let cartInfo = findCartInfo() ;
    cartCountInfo.textContent = cartInfo.productCount ; 
    cartTotalValue.textContent = cartInfo.totalPrice ; 
}
updateCartInfo();

// Fetch json file 
let fProductsArea = document.querySelector('#f-products .products-area');
let productDetailContainer = document.querySelector('#product-detail .product-detail-list')
function fProductLoadJson() {
    fetch('/json/products.json')
    .then (respnse => respnse.json())
    .then (data => {
        let html = ''; 
        data.forEach(product => {
            html += createProductBox(product);
            
        });
        fProductsArea.innerHTML = html ; 
        dealWithProductDeatilContainer(data); 

        const moreDetailButton = document.querySelectorAll('.products-area .box #more-dtl');
        moreDetailButton.forEach((product) => {
            product.addEventListener('click', () => {
                let html = '';
                DetailContainer.innerHTML = html ; 
            })
        })
    })

}




// Fetch json file
let newProductsArea = document.querySelector('#newAarrival-products .products-area');


function newProductLoadJson() {
    fetch('/json/newArrivals.json')
    .then (respnse => respnse.json())
    .then (data => {
        let html = ''; 
        data.forEach(product => {
            
            html += createProductBox(product); 
        });
        newProductsArea.innerHTML = html ;
        dealWithProductDeatilContainer(data) ; 
    })
}



function dealWithProductDeatilContainer () {
    let productDetailContainer = document.getElementById('product-detail') ;  
    let closeButton = document.querySelector('#product-detail .close-btn'); 
    const moreDetailButton = document.querySelectorAll('.products-area .box #more-dtl');
    moreDetailButton.forEach((product) => {
        product.onclick = function () {
            productDetailContainer.classList.add('show-product-detail');
        };
    });

    closeButton.onclick = function() {
        productDetailContainer.classList.remove('show-product-detail');
    }
}




function createProductBox (data) {
    let html = `
        <div class="box my-1">
            <button type="button" id="more-dtl" class="more-dtl">More Detail</button>
            <div class="product-img text-center">
                <img src="${data.productImg}" alt="" data-category="${data.productInfo.category}" data-id="${data.id}">
            </div>
            <div class="product-info my-05">
                <p class="paragraph">${data.productInfo.brand}</p>
                <h4 class="title">${data.productInfo.pName}</h4>
            </div>
            <div class="product-rate">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <div class="product-purchase flex my-05">
                <span class="price fw-700 secondary-text-clr">${data.productPrice}</span>
                <div class="cart-icon" data-flow="bottom">
                    <span class="tooltip">Add To Cart</span>
                    <i class="fa-solid fa-cart-shopping cart-btn"></i>
                </div>
            </div>
            <div class="product-size">
                <div class="select-size">Select Size</div>
                <span id="small">${data.availableSize["S"]}</span>
                <span id="large">${data.availableSize["L"]}</span>
                <span id="xlarge">${data.availableSize["XL"]}</span>
                <span id="xxlarge">${data.availableSize["XXL"]}</span>
            </div>
        </div>
    `;
    return html;
}

/* Purchase product function */
function purchaseProduct(e) {
    // Check if the clicked item has a cart-btn class 
    if (e.target.classList.contains("cart-btn")) {
        // Call the product 
        let product = e.target.parentElement.parentElement.parentElement ;
        // Call the get product info function
        getProductInfo(product); 
    }
}

// display product detail after clicking on the more deatil button 
function displayDetail(e) {
    if (e.target.classList.contains("more-dtl")){
        let product = e.target.parentElement;
        getProductDetail(product);
    }
}

function ProductGallery(e) {

    if (e.target.classList.contains('small-img')){
        let mainImg = document.getElementById('mainImg')
        let smallImgs = document.querySelectorAll('.small-img')
        let product = e.target.parentElement; 
        mainImg.src = e.target.src;
        smallImgs.forEach((img) => {
            img.parentElement.classList.remove('selected')
        })
        product.classList.add('selected')
        
    }
}

// get product detail after clicking on more deatil button 
function getProductDetail (product) {
    // Object about the details of the clicked product
    let productDetail = {
            id : productDetailItemID, 
            allProduct : document.querySelectorAll('.products-area .box'),
            allProductPrice : document.querySelectorAll('.products-area .box .price'),
            allImg : document.querySelectorAll('.products-area img'),
            mainImgSrc : product.querySelector('.product-img img').src ,
            mainImgdata : product.querySelector('.product-img img').dataset.category ,
            mainImgID : product.querySelector('.product-img img').dataset.id ,
            category : product.querySelector('.products-area img').dataset.category,
            name : product.querySelector('.product-info .title').textContent, 
            brand : product.querySelector('.product-info .paragraph').textContent , 
            price : product.querySelector('.product-purchase .price').textContent,
            size : product.querySelector('.box .product-size'),
            sizeSmall: document.querySelectorAll('.box .product-size span')[0].textContent, 
            sizeLarge: document.querySelectorAll('.box .product-size span')[1].textContent, 
            sizeXLarge: document.querySelectorAll('.box .product-size span')[2].textContent, 
            sizeXXLarge: document.querySelectorAll('.box .product-size span')[3].textContent, 
        }
    // productDetail.relatedImg; 
    productDetailItemID++ ;
    addToDetailContainer(productDetail)
    
}

let DetailContainer = document.querySelector('.product-detail-list');
function addToDetailContainer(product) {
    let productDetailItem = document.createElement('div'); 
    productDetailItem.classList.add('product-deatil-item');
    let productImg = document.createElement('div'); 
    productImg.className= 'product-detail-image'; 
    productImg.innerHTML = `<img src="${product.mainImgSrc}" alt="" id="mainImg" data-category="${product.category}" data-id="${product.mainImgID}">`;
    let productRelatedImg = document.createElement('div'); 
    productRelatedImg.className = 'product-related-image';
    productImg.appendChild(productRelatedImg);
    for (let i = 0 ; i<product.allImg.length; i++){
        if (product.mainImgdata === product.allImg[i].dataset.category) {
            let relatedImgCol = document.createElement('div'); 
            relatedImgCol.className = 'related-image-col'; 
            relatedImgCol.innerHTML = `<img src="${product.allImg[i].src}" alt="" data-category="${product.category}" data-id="${product.allImg[i].dataset.id}" class="small-img">`;
            if (product.mainImgID === product.allImg[i].dataset.id) {
                relatedImgCol.classList.add('order'); 
                relatedImgCol.classList.add('selected');
            }
            productRelatedImg.appendChild(relatedImgCol);
        }
    }
    let productDetailText = document.createElement('div'); 
    productDetailText.className = 'product-detail-text';
    productDetailText.innerHTML = ` 
            <h4 class="sub-sub-heading product-category">${product.category} / ${product.name}</h4>
            <div class="product-purchase">
                <div class="product-price">
                    <span>Price/</span>
                    <h2 class="sub-heading price">${product.price}</h2>
                </div>
                <div class="product-quantity">
                    <span class="select-quantity">Quantity</span>
                    <input type="number" value="1" id="quantity-value">
                </div>
            </div>
    `;
    let productSize = document.createElement('div'); 
    productSize.className = 'product-size' ;
    let sizeText = document.createElement('div'); 
    sizeText.className = 'select-size'; 
    sizeText.innerHTML = 'Select Size';
    productSize.appendChild(sizeText); 
    let toolTip = document.createElement('span');
    toolTip.id = 'bottom'; 
    toolTip.className = 'tooltip-text'; 
    toolTip.innerHTML = 'Out Of Stock'; 
    productSize.appendChild(toolTip); 
    // Small size 
    let small = document.createElement('span'); 
    small.id = 'small'; 
    small.innerHTML = "S"; 
    productSize.appendChild(small);
    // Large size 
    let large = document.createElement('span'); 
    large.id = 'large'; 
    large.innerHTML = "L"; 
    productSize.appendChild(large); 
    // XLarge size 
    let xlarge = document.createElement('span'); 
    xlarge.id = 'xlarge'; 
    xlarge.innerHTML = "XL"; 
    productSize.appendChild(xlarge); 
    // XXLarge size 
    let xxlarge = document.createElement('span'); 
    xxlarge.id = 'xxlarge'; 
    xxlarge.innerHTML = "XXL"; 
    productSize.appendChild(xxlarge); 
    
    for (let i = 1 ; i<product.size.children.length; i++) {
        
        if (product.size.children[1].innerHTML === 'false') {
            small.classList.add('out-of-stock')
        } 
        if (product.size.children[2].innerHTML === 'false') {
            large.classList.add('out-of-stock')
        } 
        if (product.size.children[3].innerHTML === 'false') {
            xlarge.classList.add('out-of-stock')
        } 
        if (product.size.children[4].innerHTML === 'false') {
            xxlarge.classList.add('out-of-stock')
        }
    }



    // console.log(productDetailText)
    productDetailItem.appendChild(productImg);
    productDetailItem.appendChild(productDetailText);
    productDetailItem.appendChild(productSize)

    //         <div class="product-size">
    //             <div class="select-size">Select Size</div>
    //             <span id="small">S</span>
    //             <span id="large">L</span>
    //             <span id="xlarge">XL</span>
    //             <span id="xxlarge">XXL</span>
    //         </div>

    // productDetailItem.innerHTML = `
    //     <div class="product-detail-image" id="main">
    //         <img src="${product.mainImgSrc}" alt="" id="mainImg" data-category="${product.category}">
    //         <div class="product-related-image">
    //             <div class="related-image-col">
    //                 <img src="${product.relatedImg}" alt="" data-category="Mens's T Shirt" class="small-img">
    //             </div>
    //             <div class="related-image-col">
    //                 <img src="/images/products/f2.jpg" alt="" data-category="Mens's T Shirt" class="small-img">
    //             </div>
    //             <div class="related-image-col">
    //                 <img src="/images/products/f3.jpg" alt="" data-category="Mens's T Shirt" class="small-img">
    //             </div>
    //             <div class="related-image-col">
    //                 <img src="/images/products/f4.jpg" alt="" data-category="Mens's T Shirt" class="small-img">
    //             </div>
    //         </div>
    //     </div>
    //     <div class="product-detail-text">
    //         <h4 class="sub-sub-heading product-category">${product.category} / ${product.name}</h4>
    //         <div class="product-purchase">
    //             <div class="product-price">
    //                 <span>Price/</span>
    //                 <h2 class="sub-heading price">${product.price}</h2>
    //             </div>
    //             <div class="product-quantity">
    //                 <span class="select-quantity">Quantity</span>
    //                 <input type="number" value="1" id="quantity-value">
    //             </div>
    //         </div>
    //     </div>
    // ` ; 
    DetailContainer.appendChild(productDetailItem); 
}

// get product info after clicking on the cart btn function 
function getProductInfo(product) {
    // object of the clicked product cart button 
    let productInfo = {
        id : cartItemID , 
        imgSrc : product.querySelector('.product-img img').src ,
        name : product.querySelector('.product-info .title').textContent, 
        brand : product.querySelector('.product-info .paragraph').textContent , 
        price : product.querySelector('.product-purchase .price').textContent,
    }
    cartItemID++ ; 
    console.log(productInfo)
    // Call Add to cart list function 
    addToCartList(productInfo); 
    saveProductInStorage(productInfo); 
}

// add the selected product to the cart list function 
function addToCartList(product) {
    let cartItem = document.createElement('div'); 
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`) ; 
    cartItem.innerHTML = `
        <img src="${product.imgSrc}" alt="product image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${product.name}</h3>
            <span class="cart-item-brand">${product.brand}</span>
            <span class="cart-item-price">${product.price}</span>
        </div>
        <button type="button" class="cart-item-del-btn">
            <i class="far fa-times-circle"></i>
        </button>
    ` ; 
    cartList.appendChild(cartItem); 
}

// Save the product in the local storage 
function saveProductInStorage(product) {
    let products = getProductFromStorage(); 
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products)) ;
    updateCartInfo();
}

// get the product from the local storage if there's any function
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []; 
    // if there's no product info return empty array
}

//Load cart product 
function loadCart () {
    let products = getProductFromStorage(); 
    if (products.length < 1) {
        cartItemID = 1 ;  // if there's no any product in the local storage 
    } else {
        cartItemID = products[products.length - 1].id ; 
        cartItemID++; 
        // else get the id of the last product and increase the id by 1 
    }
    products.forEach(product => addToCartList(product)); 
    // save the cart even after reload the page 

    // calculate and Update UI of cart info
    updateCartInfo();
}

// Calculate the total price of the cart and other info 
function findCartInfo () {
    let products = getProductFromStorage(); 
    let totalPrice = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)) ; // substr(index) => start after index 
        // remove the dollar sign 
        return acc += price ; 
    }, 0); // initial total price 
    
    return {
        totalPrice : totalPrice.toFixed(2), 
        productCount : products.length   
    }
}

// delete product from cart list and local storage 
function deleteProduct(e) {
    let cartItem ; 
    if (e.target.tagName === 'BUTTON') {
        cartItem = e.target.parentElement ;
        cartItem.remove(); // this remove from DOM only  
    } else if (e.target.tagName === 'I') {
        cartItem = e.target.parentElement.parentElement ; 
        cartItem.remove();  // this remove from DOM only
    } 



    

    let products = getProductFromStorage(); 
    let updateProductAfterDelete = products.filter((product) => {
        return product.id !== parseInt(cartItem.dataset.id) ; 
    }) ; 
    
    localStorage.setItem('products', JSON.stringify(updateProductAfterDelete))
    // update the local storage after deletion

    updateCartInfo();
    // Update the total price after deletion

} 

/* Create Image gallery */

let mainImg = document.getElementById('mainImg'); 
let smallImgs = Array.from(document.querySelectorAll('.related-image-col img')); 

smallImgs.forEach((img)=>{
    img.onclick = function () {
        mainImg.src = img.src ;
    }
})






















// async function getFeutredProductsData () {
//     const jsonFile = "/json/products.json" ; 
//     const respone = await fetch(jsonFile); 
//     const responeData = await respone.json(); 
//     const rate = await responeData["productRate"];

//     createProduct(responeData);

// }
// getFeutredProductsData(); 




// // Create featured product function
// function createProduct (data) {
    
//     for (let i = 0 ; i < data.length ; i++){
//         let productsArea = document.querySelector('#f-products .products-area');
//         let productsBox = document.createElement('div'); 
//         productsBox.className = 'box my-1';

//         /* product image  */ 
//         let pImg = document.createElement('div');
//         pImg.className = 'product-img text-center';
//         let image = document.createElement('img'); 
//         image.src = data[i]["productImg"] ;
//         pImg.appendChild(image);

//         /* product info, Brand */
//         let pinfo = document.createElement('div'); 
//         pinfo.className = 'product-info my-05';
//         let pBrand = document.createElement('p'); 
//         pBrand.className = 'paragraph';
//         pBrand.innerHTML = data[i]['productInfo']['brand'];
//         pinfo.appendChild(pBrand)

//         /* product info, title */
//         let ptitle = document.createElement('h4'); 
//         ptitle.className = 'title'; 
//         ptitle.innerHTML = data[i]['productInfo']['pName'];
//         pinfo.appendChild(ptitle); 

//         // product Rate 
//         let pRate = document.createElement('div');
//         pRate.className = 'product-rate';
//         if (data[i]['productRate'] === 5) {
//             for(let j=0 ; j<5 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }else if (data[i]['productRate'] === 4){
//             for(let j=0 ; j<4 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }else if (data[i]['productRate'] === 3)  {
//             for(let j=0 ; j<3 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }

//         /* Product price */
//         let pPrice = document.createElement('div');
//         pPrice.className = 'product-purchase flex my-05'; 
//         let price = document.createElement('span'); 
//         price.className = 'price fs-250 secondary-text-clr fw-700';
//         price.innerHTML = data[i]['productPrice'];
//         pPrice.appendChild(price);
//         let cartIconDiv = document.createElement('div'); 
//         cartIconDiv.className = 'cart-icon';
//         cartIconDiv.dataset.flow = 'bottom';
        
//         let toolTip = document.createElement('span'); 
//         toolTip.className = 'tooltip'; 
//         toolTip.innerHTML = "Add To Cart"; 
//         cartIconDiv.appendChild(toolTip); 

//         let icon = document.createElement('i');
//         icon.className = 'fa-solid fa-cart-shopping'; 
//         cartIconDiv.appendChild(icon);

//         pPrice.appendChild(cartIconDiv); 


//         productsBox.appendChild(pImg);
//         productsBox.appendChild(pinfo);
//         productsBox.appendChild(pRate);
//         productsBox.appendChild(pPrice);

//         // Append to Website
//         productsArea.appendChild(productsBox);
        

//     }
// }

// async function getNewArrivalsProductData() {
//     const jsonFile = '/json/newArrivals.json'; 
//     const respone = await fetch(jsonFile); 
//     const responeData = await respone.json(); 
    
//     console.log(responeData)
//     createNewProduct(responeData);
// }
// getNewArrivalsProductData(); 


// // Create new arrival products function
// function createNewProduct (data) {
    
//     for (let i = 0 ; i < data.length ; i++){
//         let productsArea = document.querySelector('#newAarrival-products .products-area');
//         console.log(productsArea)
//         let productsBox = document.createElement('div'); 
//         productsBox.className = 'box my-1';

//         /* product image  */ 
//         let pImg = document.createElement('div');
//         pImg.className = 'product-img text-center';
//         let image = document.createElement('img'); 
//         image.src = data[i]["productImg"] ;
//         pImg.appendChild(image);

//         /* product info, Brand */
//         let pinfo = document.createElement('div'); 
//         pinfo.className = 'product-info my-05';
//         let pBrand = document.createElement('p'); 
//         pBrand.className = 'paragraph';
//         pBrand.innerHTML = data[i]['productInfo']['brand'];
//         pinfo.appendChild(pBrand)

//         /* product info, title */
//         let ptitle = document.createElement('h4'); 
//         ptitle.className = 'title'; 
//         ptitle.innerHTML = data[i]['productInfo']['pName'];
//         pinfo.appendChild(ptitle); 

//         // product Rate 
//         let pRate = document.createElement('div');
//         pRate.className = 'product-rate';
//         if (data[i]['productRate'] === 5) {
//             for(let j=0 ; j<5 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }else if (data[i]['productRate'] === 4){
//             for(let j=0 ; j<4 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }else if (data[i]['productRate'] === 3)  {
//             for(let j=0 ; j<3 ; j++){
//                 let stars = document.createElement('i'); 
//                 stars.className = 'fa-solid fa-star';
//                 stars.style.color = "#FEBE00" ;
//                 pRate.appendChild(stars);
//             }
//         }

//         /* Product price */
//         let pPrice = document.createElement('div');
//         pPrice.className = 'product-purchase flex my-05'; 
//         let price = document.createElement('span'); 
//         price.className = 'price fs-250 secondary-text-clr fw-700';
//         price.innerHTML = data[i]['productPrice'];
//         pPrice.appendChild(price);
//         let cartIconDiv = document.createElement('div'); 
//         cartIconDiv.className = 'cart-icon';
//         cartIconDiv.dataset.flow = 'bottom';
        
//         let toolTip = document.createElement('span'); 
//         toolTip.className = 'tooltip'; 
//         toolTip.innerHTML = "Add To Cart"; 
//         cartIconDiv.appendChild(toolTip); 

//         let icon = document.createElement('i');
//         icon.className = 'fa-solid fa-cart-shopping'; 
//         cartIconDiv.appendChild(icon);

//         pPrice.appendChild(cartIconDiv); 


//         productsBox.appendChild(pImg);
//         productsBox.appendChild(pinfo);
//         productsBox.appendChild(pRate);
//         productsBox.appendChild(pPrice);

//         // Append to Website
//         productsArea.appendChild(productsBox);
        

//     }
// }

