const { Schema, model } = require('mongose');

const characterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Your character must have a name!'],
        minLength: 2,
        maxLength: 20,
        trim: true
    },
    currentHp: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    }],
    statblock: [{
        type: Schema.Types.ObjectId,
        ref: 'StatBlock',
        required: true
    }],
    isfighting: {
        type: Boolean,
        required: true
    }
});

const Character = model('Character', characterSchema);

module.exports = Character;

