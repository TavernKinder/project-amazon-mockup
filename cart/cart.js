import { storage } from '../utils/storage.js';

export class CartItem {
    constructor(product, amount = 1) {
        this.id = product.id;
        this.name = product.name;
        // store cents internally
        this.priceCents = product.price;
        this.description = product.description;
        this.amount = amount;
    }
    increment(qty = 1) {
        this.amount += qty;
    }
    decrement(qty = 1) {
        this.amount = Math.max(0, this.amount - qty);
    }
    // Expose price in dollars for UI code
    get price() {
        return this.priceCents / 100;
    }

    // Total price (dollars) for this cart item
    get totalPrice() {
        return +(this.price * this.amount).toFixed(2);
    }
}

export const cart = {
    items: (storage.getCartItems() || []).map(it => {
        const product = {
            id: it.id,
            name: it.name,
            // prefer stored cents field if present
            price: it.priceCents !== undefined ? it.priceCents : it.price,
            description: it.description,
            image: it.image
        };
        return new CartItem(product, it.amount || 1);
    }),
    cartLength() {
        const cartLengthElement = document.getElementById('cartLength');
        const total = this.items.reduce((sum, it) => sum + (it.amount || 0), 0);
        if (cartLengthElement) cartLengthElement.textContent = parseInt(total) || 0;
    },
    updateCart() {
        storage.saveCartItems(this.items);
        this.cartLength();
    },
    addToCart(product, quantity = 1) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) {
            existing.amount = (existing.amount || 0) + quantity;
        } else {
            const cartItem = new CartItem(product, quantity);
            this.items.push(cartItem);
        }
        this.updateCart();
    },
    removeItem(remID) {
        const idx = this.items.findIndex(product => product.id === remID);
        if (idx !== -1) {
            this.items.splice(idx, 1);
            this.updateCart();
        }
    },
    editItem(editID, amountNew){
        try{Number.isInteger(amountNew) && amountNew >= 0}
        catch{
            return(console.log('Not A valid Integer'))
        }// There would probrably be another catch detirmening if the value of amountNew is more than the available stock
        const idx = this.items.find(product => product.id === editID);
        if (idx !== -1 && amountNew > 0) {
            idx.amount = amountNew
            this.updateCart();
        }else if(amountNew === 0){
            this.removeItem(editID)
        }
    },
    clearCart() {
        this.items = [];
        this.updateCart();
    },
    buyItems() {
        // In a real application, you would send the cart data and payment data, then you would wait for the purchas to be confirmed
        this.clearCart();
        alert('Thank you for your purchase!');
    }
}




