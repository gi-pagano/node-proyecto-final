const express = require("express");
const { Router } = express;
const router = Router();
const Actions = require("../Controller/controller");
const admin = true;

// PRODUCTOS
// devuelve todos los prods - GET
router.get("/api/productos", (req, res) => {
    Actions.getAll().then(data => {
        res.status(200).send(data)}).catch(err => {
        console.log(err)
    })
})

// devuelve un prod x id - GET
router.get("/api/productos/:id", (req, res) => {
    const {id} = req.params;
    Actions.getOne(id)
        .then(product => {
            res.status(200).json(product);
        }).catch(err => {
            console.error(err)})
});

// agrega nuevo prod - POST
router.post("/api/productos", (req, res) => {
    res.send(admin ? Actions.add(req.body) : {error: -1, description: 'método POST, Ruta /productos no autorizada'});
});

// modifica prod x id - PUT
router.put("/api/productos/:id", (req, res) => {
    const {id} = req.params
    const body = req.body
    res.send(admin ? Actions.update(id, body) : {error: -2, description: 'método PUT, Ruta /productos no autorizada'});
});

// borrar prod x id - DELETE
router.delete("/api/productos/:id", (req, res) => {
    res.send(admin ? Actions.delete(req.params.id) : {error: -3, description: 'método DELETE, Ruta /productos no autorizada'});
})

// CARRITO

// POST del carrito
router.post("/api/carrito/", (req, res) => {
    const prods = req.body;
    res.send(Actions.createCart(prods));
})

// borrar - DELETE
router.delete("/api/carrito/:id", (req, res) => {
    res.send(Actions.deleteCart(req.params.id));
})

// Devuelve prod  - GET
router.get("/api/carrito/:id/productos", (req, res) => {
    Actions.getCartProducts(req.params.id)
        .then(data => { res.status(200).send(data) }).catch(err => { console.log(err) })
})

// Añadir prod al carrito x id - POST
router.post("/api/carrito/:id/productos", (req, res) => {
    const {id} = req.params;
    const productId = req.body.id;
    res.send(Actions.addToCart(id, productId));
})

// Borrar prod del carrito x id - DELETE
router.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
    const {id, id_prod} = req.params;
    res.send(Actions.deleteFromCart(id, id_prod));
})

module.exports = router;