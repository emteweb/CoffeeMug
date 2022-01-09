const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../models/product');
const ExpressError = require('../helpers/ExpressError');



// route for displaying all products
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('index', { products })
});

// route for displaying form
router.get('/new', (req, res) => {
    res.render('new');
})

//route for product's details
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product);
    res.render('show', { product })
})

//route for editing product
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product })
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        //const product = await Product.findById(id);
        product.name = req.body.name;
        product.price = req.body.price;
        product.updateDate = new Date();
        product.save();
        res.redirect(`/products/${product._id}`)
    } catch (e) {
        next(e)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

// route for creating new product
router.post('/', async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log(newProduct);
        res.redirect(`/products/${newProduct._id}`);
    } catch (e) {
        next(e);
    }
})

module.exports = router;