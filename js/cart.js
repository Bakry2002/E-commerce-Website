/* Cart */

/* Remove item from cart button  */
let removeBtn = document.getElementsByClassName('remove-btn'); 
console.log(removeBtn)

let cartTable = document.querySelector('#cart table'); 
console.log(cartTable)

for (let i =0 ; i<removeBtn.length ; i++) {
    let button = removeBtn[i]; 
    button.addEventListener('click', (e) => { 
        e.target.parentElement.parentElement.remove();
        // updateCartTotal()

        let div = document.createElement('div');
        let text = document.createElement('p');
        let btn = document.createElement('button'); 
        if (removeBtn.length == 0) {
            cartTable.remove();
            div.className = "empty-cart my-1"; 
            text.className = "title"; 
            text.innerHTML = "Your Cart is Empty!"; 
            btn.className = "btn"; 
            btn.innerHTML = "Continue Shopping";
            div.appendChild(text); 
            div.appendChild(btn);
            console.log(div);

            let area = document.getElementById('cart'); 
            area.appendChild(div); 
        }

        btn.onclick = function() {
            window.location.href = '/shop.html'; 
        }
    })

}

function updateCartTotal () {
    let price = document.querySelectorAll('#cart table .price'); 
    console.log(price)
}

updateCartTotal()

// The "DOMContentLoaded" event fires when the DOM content is loaded, 
// without waiting for images and stylesheets to finish loading.
// Only handle DOMContentLoaded event if you place the JavaScript code in the head, 
// which references elements in the body section.
window.addEventListener('DOMContentLoaded', () => {
    loadJson(); 
})


function loadJson() {
    fetch('/json/shopProducts.json')
    .then (respnse => respnse.json())
    .then (data => {
        let html = ''; 
        data.forEach(product => {
        }); 
    })
}

// the same as above but with different syntax
/* async function getJson() {
    let response = await fetch('/json/shopProducts.json'); 
    let responseData = await response.json(); 
    responseData.forEach(product => {
        console.log(product)
    })
}
getJson() */