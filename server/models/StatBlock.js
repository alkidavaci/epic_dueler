const { Schema, model } = require('mongoose');

const statSchema = new Schema({
    maxHp: {
        type: Number
    },
    weaponRange: {
        type: Number,
        min: [0, 'Weapon is too weak'],
        max: [100, 'Weapon is too strong'],
        required: true
    },
    attack: {
        type: Number,
        required: true,
        min: 0
    },
    attacksPerRound: {
        type: Number,
        required: true
    },
    defense: {
        type: Number,
        required: true
    },
    crit: {
        type: Number,
        required: true
    },
    parry: {
        type: Boolean,
        required: true
    }
});

const StatBlock = model('StatBlock', statSchema);

module.exports = StatBlock;