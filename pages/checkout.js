import {products} from '../data/products-data.js';
import {cart} from '../cart/cart.js';
import { renderHeader } from './header.js';
renderHeader();
cart.cartLength();
const main = document.getElementById("checkout-main")
let fullPrice = 0;

function renderCartPage() {
    if(cart.items.length === 0){main.innerHTML = 
        '<div class-"checkout-container"><h1 class="text-2xl font-bold mt-8 mb-4">Your cart is empty</h1></div>'}
    else{
        main.innerHTML = `
        <div class="checkout-container">
            <section class="checkout-column checkout-left">
                <h1 class="text-2xl font-bold mt-8 mb-4">Your Cart:</h1>
                <div id='cartItems'><!-- Cart items will be dynamically added here --></div>
            </section>
            <aside id="checkoutBox" class="checkout-column checkout-right">
                <h2 class="text-xl font-bold">Total: $<span id="totalPrice">0.00</span></h2>
                <button class="mt-4 bg-amazon-yellow text-white px-4 py-2 rounded hover:bg-amazon-yellow-hover" id="checkoutButton">Proceed to Checkout</button>
            </aside>
        </div>`;
        const cartItems = document.getElementById('cartItems');
        fillCartAndCost();
        const checkoutBTN = document.getElementById('checkoutButton');
        checkoutBTN.addEventListener('click', () =>{
            renderCheckoutPage();
        })
    }
}

function renderCheckoutPage() {
    let cartHtml = '';
    fullPrice = 0;
    let total = 0;
    if (cart.items.length === 0) {
        cartHtml = '<div>Your cart is empty.</div>';
    } else {
        cartHtml = '<ul style="list-style:none;padding:0;">';
        cart.items.forEach(item => {
            total += item.totalPrice;
            cartHtml += `
                <li style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #eee;">
                    <div style="display:flex;align-items:center;">
                        <img src="${item.image}" alt="${item.name}" style="width:48px;height:48px;object-fit:cover;margin-right:16px;border-radius:6px;">
                        <div>
                            <div style="font-weight:bold;">${item.name}</div>
                            <div>$${item.price.toFixed(2)} x ${item.amount}</div>
                        </div>
                    </div>
                    <div style="font-weight:bold;">$${item.totalPrice.toFixed(2)}</div>
                </li>
            `;
        });
        cartHtml += '</ul>';
    }
    main.innerHTML = `
        <div style="max-width:600px;margin:32px auto;padding:24px;background:#fff;border-radius:8px;box-shadow:0 2px 8px #eee;">
            <h2 style="font-size:2rem;font-weight:bold;color:#ff9900;margin-bottom:24px;">Your Cart</h2>
            ${cartHtml}
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:32px;">
                <div style="font-size:1.2rem;font-weight:bold;">Total: $${total.toFixed(2)}</div>
                <button id="confirm-purchase" style="background:#ffd814;color:#222;font-weight:bold;padding:12px 32px;border:none;border-radius:6px;font-size:1.1rem;cursor:pointer;">Confirm Purchase</button>
            </div>
        </div>
    `;
    const confirmBtn = document.getElementById('confirm-purchase');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            alert('Purchase confirmed!');
            cart.buyItems();
            renderCartPage();
        });
    }
}
function fillCartAndCost(){
    fullPrice = 0;
    cart.items.forEach(item => {
        // `item.price` is a getter returning dollars, `item.totalPrice` is the total dollars for that item
        fullPrice += item.totalPrice;
        cartItems.innerHTML += `
        <div class="checkout-item flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 col-span-1">
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                <div>
                    <div>
                        <h2 class="text-lg font-bold">${item.name}</h2>
                        <p class="text-gray-600">$${item.price.toFixed(2)} X ${item.amount}</p>
                    </div>
                    <div>
                        <p class="text-amazon-yellow font-bold mt-2">Total: $${item.totalPrice}</p>
                    </div>
                    </div>
                    <div>
                        <p class="checkout-desc truncate"> ${item.description} </p>
                    </div>
                </div>
                <div class="edit-item">
                    <button id='edit-${item.id}' class='edit'>edit</button>
                    <button id='remove-${item.id}' class='remove'>remove</button>
                </div>
            </div>
        </div>
        `;
    });
    cart.items.forEach(item => {
        let currentRemove = document.getElementById(`remove-${item.id}`)
        currentRemove.addEventListener('click', () => {
            cart.removeItem(item.id);
            renderCartPage();
        })
        let currentEdit = document.getElementById(`edit-${item.id}`)
        currentEdit.addEventListener('click', () => {
            let editAmount = prompt("What would you like to Change the amount to?", item.amount)
            cart.editItem(item.id, editAmount);
            renderCartPage();
        })
    });
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) totalPriceElement.textContent = fullPrice.toFixed(2);
}
renderCartPage();




