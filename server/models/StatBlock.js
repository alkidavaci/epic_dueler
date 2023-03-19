const { Schema, model } = require('mongoose');

const statSchema = new Schema({
    hp: {
        type: Number,
        required: true,
        default: 60
    },
    range: {
        type: Number,
        min: [1, 'Weapon is too weak'],
        max: [20, 'Weapon is too strong'],
        required: true,
        default: 4
    },
    attack: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    defense: {
        type: Number,
        required: true,
        default: 0
    },
    crit: {
        type: Number,
        required: true,
        default: 0
    },
    parry: {
        type: Number,
        required: true,
        default: 0
    }
});

const StatBlock = model('StatBlock', statSchema);

module.exports = StatBlock;