export const storage = {
    saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    getCartItems() {
        const items = localStorage.getItem('cartItems');
        return items ? JSON.parse(items) : [];
    }
}

