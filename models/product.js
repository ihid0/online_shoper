const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    image:{
        type: String
    },
    city:{
        type: String,
        required : true
    },
    price:{
        type: Number,
        required : true
    },
    userId:{
        type: String,
        required: true
    }
});

const product = mongoose.model('product', productschema);

module.exports = product;