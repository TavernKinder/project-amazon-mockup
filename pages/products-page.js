import { products } from '../data/products-data.js';
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
            <p class="text-gray-600 mt-2">${currentProduct.description}</p>
            <p class="text-green-500 mt-2 font-bold">$${currentProduct.price.toFixed(2)}</p>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
        </div>
     ` ;
    }
}
renderProductsPage();