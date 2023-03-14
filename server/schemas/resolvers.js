const { AuthenticationError } = require('@apollo/server');
const { Account, Character, Inventory, Item, StatBlock } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.account) {
                if (context.account.character) {
                    const characterData = await Character
                        .findOne({ _id: context.account.character })
                        .populate("inventory")
                        .populate("statblock");
                    return characterData;
                };
                throw new AuthenticationError("No Character found!");
            };
            throw new AuthenticationError("Not logged in!");
        },
        opponent: async (parent, args, context) => {
            if (context.account.character) {
                const opponentData = await Character
                    .findOne({ _id: context.character._id })
                    .populate("statblock");
                return opponentData;
            };
            throw new AuthenticationError("No Character found!");
        },

        shop: async () => {
            return Item.find({});
        },

        characters: async () => {
            return Character.find({});
        },

    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await Account.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Email or Password does not match!");
            };

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Email or Password does not match!");
            };

            const token = signToken(user);
            return { token, user };

        },

        addAccount: async (parent, args) => {
            const user = await Account.create(args);
            const token = signToken(user);

            return { token, user };

        },



    },
};

module.exports = resolvers;

// login: (name, email)

// add account: (name, email, password)

// add character: (name) > generate inventory
//                       > generate statblock

// update inventory: > set to item => update statblock
//                     + pull from bag && push to bag
//                     || add item
//                     => +/- gold(optional)

// update character (wins deaths gold)


// remove character

// remove account