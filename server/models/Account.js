const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must match a valid email address!'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }
});

accountSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next();
});

accountSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const Account = model('Account', accountSchema);

module.exports = Account;