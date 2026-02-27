import { products } from '../data/products-data.js';
import {cart} from '../cart/cart.js';
cart.cartLength();
function renderProductsPage() {
    const productsPageContainer = document.getElementById('products-page');
    console.log(products);
    let currentProduct = null;
    for (let i = 0; i < products.length; i++) {
        currentProduct = products[i];
        productsPageContainer.innerHTML +=  `
        <div class="product-card shadow-lg rounded-lg p-4 m-4 bg-white col-span-1">
        <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-full h-48 object-cover rounded-t-lg">
            <h2 class="text-xl font-bold mt-4">${currentProduct.name}</h2>
            <p class="text-gray-600 mt-2 truncate">${currentProduct.description}</p>
            <p class="text-amazon-orange mt-2 font-bold">$${currentProduct.toDollar ? currentProduct.toDollar() : (currentProduct.price/100).toFixed(2)}</p>
            <button class="mt-4 bg-amazon-yellow text-white px-4 py-2 rounded hover:bg-amazon-yellow-hover buyButton" id="${currentProduct.id}">Add to Cart</button>
        </div>
     ` ;
    }
}
renderProductsPage();
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('buyButton')) {
        const productId = parseInt(event.target.id);
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            cart.addToCart(productToAdd);
        }
    }
});