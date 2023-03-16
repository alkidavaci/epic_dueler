const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Your character must have a name!'],
        unique: true,
        minLength: 2,
        maxLength: 20,
        trim: true
    },
    gold: {
        type: Number,
        required: true,
        default: 300
    },
    wins: {
        type: Number,
        required: true,
        default: 0
    },
    deaths: {
        type: Number,
        required: true,
        default: 0
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    statblock: {
        type: Schema.Types.ObjectId,
        ref: 'StatBlock',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
});

const Character = model('Character', characterSchema);

module.exports = Character;

