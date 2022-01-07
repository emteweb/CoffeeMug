const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    name: {
        type: String,
        required: Boolean,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: Boolean,
        min: 0
    },
    updateDate: {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;