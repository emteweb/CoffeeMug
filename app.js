const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Product = require('./models/product');
require('dotenv').config();


const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL || 'mongodb://localhost:27017/shopDb';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }, console.log("Connected!!!!"));
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});



app.use(express.static(path.join(__dirname, 'public'))); // to let Express know we want to use those files
app.use(express.urlencoded({ extended: true })); //to have access to req.body in POST method
app.use(methodOverride('_method')); // to override POST method

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// route for displaying all products
app.get('/', async (req, res) => {
    res.render('home')
});

// route for displaying all products
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('index', { products })
});

// route for displaying form
app.get('/products/new', (req, res) => {
    res.render('new');
})

//route for product's details
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product);
    res.render('show', { product })
})

//route for editing product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    //const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const product = await Product.findById(id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.updateDate = new Date();
    product.save();
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

// route for creating new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Running on port ${port}`); })