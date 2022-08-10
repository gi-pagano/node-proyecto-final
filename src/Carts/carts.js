const fs = require('fs');
const Contenedor = require('../utils/contenedor');

let contenedor = new Contenedor('./public/carts.json');

async function createCart(prods) {
    try {
        const data = await fs.promises.readFile('./public/carts.json');
        const array = JSON.parse(data);
        const id = array.length + 1;
        const cart = {
        id: id,
        products: prods
        }
        contenedor.save(cart)
        return cart;
    } catch (err) {
        throw new Error(err);
    }
}

async function getCart(id) {
    try {
        const data = await fs.promises.readFile('./public/carts.json');
        const array = JSON.parse(data);
        const cart = array.find(cart => cart.id == id)
        return cart ?? "No encontrado";
    } catch (err) {
        throw new Error(err);
    }
}

async function getAllCarts() {
    try {
        const data = await fs.promises.readFile('./public/carts.json');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(err);
    }
}

async function updateCart(id, newContent) {
    try {
        const cart = await getCart(id);
        if ((cart.id == id) && (cart.id != null)) {
        cart.products = newContent.products
        contenedor.update(cart)
        return cart
        } else {
        return 'No encontrado'
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function addToCart(id, product) {
    try {
        const cart = await getCart(id);
        if ((cart.id == id) && (cart.id != null)) {
        cart.products.push(product)
        contenedor.update(cart)
        return cart
        } else {
        return 'No encontrado'
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteFromCart(id, productId) {
    try {
        const cart = await getCart(id);
        if ((cart.id == id) && (cart.id != null)) {
        cart.products = cart.products.filter(product => product.id != productId)
        contenedor.update(cart)
        return cart
        } else {
        return 'No encontrado'
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteCart(id) {
    try {
        const cart = await getCart(id);
        if ((cart.id == id) && (cart.id != null)) {
        contenedor.delete(id)
        return 'Cart eliminado'
        } else {
        return 'No encontrado'
        }
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { createCart, getCart, getAllCarts, updateCart, deleteCart, addToCart, deleteFromCart };