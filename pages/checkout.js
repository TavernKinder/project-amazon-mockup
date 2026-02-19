import {products} from '../data/products-data.js';
import {cart} from '../cart/cart.js';



cart.cartLength();

function renderCheckoutPage() {
    const checkoutPageContainer = document.getElementById('cartItems');
    let fullPrice = 0;
    cart.items.forEach(item => {
        // `item.price` is a getter returning dollars, `item.totalPrice` is the total dollars for that item
        fullPrice += item.totalPrice;
        checkoutPageContainer.innerHTML += `
        <div class="checkout-item flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 col-span-1">
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                <div>
                <div>
                    <h2 class="text-lg font-bold">${item.name}</h2>
                    <p class="text-gray-600">$${item.price.toFixed(2)} X ${item.amount}</p>
                </div>
                <div>
                    <p class="text-green-500 font-bold mt-2">Total: $${item.totalPrice}</p>
                </div>
            </div>
        </div>
        `;
    });
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) totalPriceElement.textContent = fullPrice.toFixed(2);
}
renderCheckoutPage();

