const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    icon: {
        type: String,
        default: '❔'
    },
    itemtype: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        trim: true
    }
});

const Item = model('Item', itemSchema);

module.exports = Item;