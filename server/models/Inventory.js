const { Schema, model } = require('mongoose');

const invSchema = new Schema({
    weapon: {
        type: String,
        required: [true, 'You cannot fight without a weapon!']
    },
    armor: {
        type: String,
        required: true
    },
    slot1: {
        type: String,
        required: true
    },
    slot2: {
        type: String,
        required: true
    },
    slot3: {
        type: String,
        required: true
    },
    slot4: {
        type: String,
        required: true
    },
    slot5: {
        type: String,
        required: true
    }
});


const Inventory = model('Inventory', invSchema);

module.exports = Inventory;

