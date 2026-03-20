export class ProductsBase {
    // Represents a single product. `price` is stored in cents.
    constructor({ id = null, price = 0, name = '', description = '', image = '' } = {}) {
        this.id = id || Math.floor(Math.random() * 1000); // Generate random ID if not provided
        this.price = price; // cents
        this.name = name;
        this.description = description;
        this.image = image;
    }

    // Instance method to convert this product's cent price to a dollar string
    toDollar() {
        return (this.price / 100).toFixed(2);
    }
}

export const products = [
    new ProductsBase({
        id: 1,
        name: 'Product 1',
        description: 'This is a great product that you will love!',
        price: 1999,
        image: '#'
    }),
    new ProductsBase({
        id: 2,
        name: 'Product 2',
        description: 'This is another fantastic product that you will adore!',
        price: 2999,
        image: '#'
    }),
    new ProductsBase({
        id: 3,
        name: 'Product 3',
        description: 'This is an amazing product that you will find irresistible!',
        price: 3999,
        image: '#'
    }),
    new ProductsBase({
        id: 4,
        name: 'Product 4',
        description: 'This is a wonderful product that you will be thrilled to have!',
        price: 4999,
        image: '#'
    }),
    new ProductsBase({
        id: 5,
        name: 'Product 5',
        description: 'This is a fantastic product that you will be excited to own!',
        price: 5999,
        image: '#'
    }),
    new ProductsBase({
        id: 6,
        name: 'Product 6',
        description: 'THIS IS A SUPER DUPER LONG DESCRIPTION FOR TESTING PURPOUSES HI MOM HOW ARE YOU CAN YOU SEE ME FROM DOWN HERE IM ON TELEVISION MOM HOLY MOLY DFSPOGNEWIOCFMERIOWCVNERIOVFOIWJVOGK ERW',
        price: 6999,
        image: '#'
    })
];