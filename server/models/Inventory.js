const { Schema, model } = require('mongoose');

const invSchema = new Schema({
    weapon: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    armor: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    slot1: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    slot2: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    slot3: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    slot4: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    bag: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});


const Inventory = model('Inventory', invSchema);

module.exports = Inventory;

