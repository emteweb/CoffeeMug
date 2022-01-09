const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Product = require('./models/product');
const products = require('./routes/products')
require('dotenv').config();
const ExpressError = require('./helpers/ExpressError');

const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL || 'mongodb://localhost:27017/shopDb';

/* const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
}); */

mongoose.connect(uri, { useNewUrlParser: true });
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });


app.use(express.static(path.join(__dirname, 'public'))); // to let Express know we want to use those files
app.use(express.urlencoded({ extended: true })); //to have access to req.body in POST method
app.use(methodOverride('_method')); // to override POST method
app.use('/products', products);

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render('error', { err });
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// route for displaying all products
app.get('/', async (req, res) => {
    res.render('home')
});





const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Running on port ${port}`); })