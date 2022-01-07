const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopDb');
}

const seedProducts = [
    { name: "Mountain bike", price: 1200, updateDate: new Date() },
    { name: "Golf club", price: 255, updateDate: new Date() },
    { name: "Swimming suit", price: 150, updateDate: new Date() },
    { name: "Sport shoes", price: 349, updateDate: new Date() },
    { name: "Surf board", price: 1789, updateDate: new Date() },
]

Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(e => { console.log(e) })
