const { AuthenticationError } = require('@apollo/server/express4');
const { Account, Character, Inventory, Item, StatBlock } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            console.log("hey", context.account.username);
            if (context.account) {

                const characterData = await Character
                    .findOne({ name: context.account.username })
                    .populate("inventory")
                    .populate("statblock")
                    .populate([{ path: 'inventory', populate: [{ path: 'weapon' }, { path: 'armor' }, { path: 'slot1' }, { path: 'slot2' }, { path: 'slot3' }, { path: 'slot4' }, { path: 'bag' }] }]).exec();
                return characterData;

            };
            throw new Error("Not logged in!");
        },

        opponent: async (parent, { name }) => {

            const opponentData = await Character
                .findOne({ name: name })
                .populate("statblock");
            if (opponentData) {
                return opponentData;
            } else {

                throw new Error("No Character found!");
            }
        },

        shop: async () => {
            return Item.find({});
        },

        characters: async (parent, args, context) => {
            return Character.find({ name: { $ne: context.account.username }});
        },

    },

    Mutation: {

        login: async (parent, { username, password }) => {
            const account = await Account.findOne({ username });
            if (!account) {
                throw new Error("Username or Password does not match!");
            };

            const correctPw = await account.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error("Username or Password does not match!");
            };

            const token = signToken(account);
            return { token, account };

        },

        // username, email, password
        addAccount: async (parent, args) => {
            const account = await Account.create(args);
            const token = signToken(account);

            return { token, account };

        },

        addCharacter: async (parent, { name }) => {

            const emptyItem = await Item.findOne({ name: "empty" });
            const inventory = await Inventory.create({ weapon: emptyItem._id, armor: emptyItem._id, slot1: emptyItem._id, slot2: emptyItem._id, slot3: emptyItem._id, slot4: emptyItem._id });
            const statblock = await StatBlock.create({});
            const character = await Character.create({ name: name, inventory: inventory._id, statblock: statblock._id });

            const account = await Account.findOneAndUpdate(
                { username: name },
                { $set: { character: character._id } },
                { new: true }
            ).populate('character');
            if (!account) {
                throw new Error("Username or Password does not match!");
            };

            return { account };

        },

        //Update Inv( characterId, statblockId, inventoryId, itemId, action, slot) 
        //action = equip/sell/buy
        updateInventory: async (parent, { characterId, statblockId, inventoryId, itemId, action, slot }) => {
            var cost = 0;
            var ratingChange = 0;
            const emptyItem = await Item.findOne({ name: "empty" });
            const inventory = await Inventory.findOne({ _id: inventoryId });
            const newItem = await Item.findOne({ _id: itemId });
            var newItemStat;
            var oldItem;  // the item in slot
            var oldStat; // possible array of stat values on the old item
            if (slot) {
                switch (slot) {
                    case 'weapon':
                        oldItem = await Item.findOne({ _id: inventory.weapon });
                        break;
                    case 'armor':
                        oldItem = await Item.findOne({ _id: inventory.armor });
                        break;
                    case 'slot1':
                        oldItem = await Item.findOne({ _id: inventory.slot1 });
                        break;
                    case 'slot2':
                        oldItem = await Item.findOne({ _id: inventory.slot2 });
                        break;
                    case 'slot3':
                        oldItem = await Item.findOne({ _id: inventory.slot3 });
                        break;
                    case 'slot4':
                        oldItem = await Item.findOne({ _id: inventory.slot4 });
                        break;
                }
                if (oldItem._id != emptyItem._id && oldItem._id != newItem._id) {
                    oldStat = oldItem.value.split(',');
                    for (let i = 0; i < oldStat.length; i++) {
                        var stat = oldStat[i].split('.');
                        let change = -(parseInt(stat[1]));
                        if (stat[0] === 'range') {
                            ratingChange -= (change / 2);
                        } else if (stat[0] === 'hp') {
                            ratingChange -= (change / 12);
                        } else {
                            ratingChange -= change;
                        }
                        await StatBlock.findOneAndUpdate(
                            { _id: statblockId },
                            { $inc: { [`${stat[0]}`]: change } }
                        );
                    }
                }
            };
            switch (action) {
                case 'equip':
                    if (newItem._id != emptyItem._id && oldItem._id != newItem._id) {
                        newItemStat = newItem.value.split(',');
                        for (let i = 0; i < newItemStat.length; i++) {
                            var stat = newItemStat[i].split('.');
                            let change = parseInt(stat[1]);
                            if (stat[0] === 'range') {
                                ratingChange += (change / 2);
                            } else if (stat[0] === 'hp') {
                                ratingChange += (change / 12);
                            } else {
                                ratingChange += change;
                            }
                            await StatBlock.findOneAndUpdate(
                                { _id: statblockId },
                                { $inc: { [`${stat[0]}`]: change } }
                            );
                        }
                        await Inventory.findOneAndUpdate(
                            { _id: inventoryId },
                            { $addToSet: { bag: { _id: oldItem._id } }, $set: { [`${slot}`]: itemId } },
                            { new: true }
                        );
                    } else if (oldItem._id != newItem._id) {
                        await Inventory.findOneAndUpdate(
                            { _id: inventoryId },
                            { $set: { [`${slot}`]: itemId } }
                        );
                    }
                    var char = await Character.findOneAndUpdate(
                        { _id: characterId },
                        { $inc: { rating: ratingChange } },
                        { new: true }
                    ).populate("inventory")
                    .populate("statblock")
                    .populate([{ path: 'inventory', populate: [{ path: 'weapon' }, { path: 'armor' }, { path: 'slot1' }, { path: 'slot2' }, { path: 'slot3' }, { path: 'slot4' }, { path: 'bag' }] }]).exec();

                    return { char };


                case 'sell':
                    //findOne itemId
                    const sellItem = await Item.findOne({ _id: itemId });
                    cost = Math.floor(sellItem.price / 2);
                    //inventory findoneandupdate $pull itemId from bag
                    const reducedInventory = await Inventory.findOneAndUpdate(
                        { _id: inventoryId },
                        { $pull: { bag: { _id: itemId } } },
                        { new: true }
                    );
                    //findoneandupdate chatacterId >  $inc: {gold:cost}
                    var char = await Character.findOneAndUpdate(
                        { _id: characterId },
                        { $inc: { gold: cost } },
                        { new: true }
                    ).populate('inventory').populate('statblock');

                    return { char, reducedInventory };
                case 'buy':
                    //findOne itemId
                    const buyItem = await Item.findOne({ _id: itemId });
                    cost -= buyItem.price;
                    //inventory findoneandupdate $pull itemId from bag
                    await Inventory.findOneAndUpdate(
                        { _id: inventoryId },
                        { $addToSet: { bag: { _id: itemId } } },
                        { new: true }
                    );
                    //findoneandupdate chatacterId >  $inc: {gold:cost}
                    var char = await Character.findOneAndUpdate(
                        { _id: characterId },
                        { $inc: { gold: cost } },
                        { new: true }
                    ).populate("inventory")
                    .populate("statblock")
                    .populate([{ path: 'inventory', populate: [{ path: 'weapon' }, { path: 'armor' }, { path: 'slot1' }, { path: 'slot2' }, { path: 'slot3' }, { path: 'slot4' }, { path: 'bag' }] }]).exec();

                    return { char };
                default:
                    throw new Error("Action Not Possible!");
            }

        },


        updateCharacter: async (parent, { name, win, gain }) => {
            var char
            if (win) {
                char = await Character.findOneAndUpdate(
                    { name: name },
                    { $inc: { [`wins`]: 1 }, $inc: { [`gold`]: gain } },
                    { new: true }
                ).populate("inventory")
                .populate("statblock")
                .populate([{ path: 'inventory', populate: [{ path: 'weapon' }, { path: 'armor' }, { path: 'slot1' }, { path: 'slot2' }, { path: 'slot3' }, { path: 'slot4' }, { path: 'bag' }] }]).exec();

            } else {
                const resTax = -(Math.floor(gain / 2));
                char = await Character.findOneAndUpdate(
                    { name: name },
                    { $inc: { [`deaths`]: 1 }, $inc: { [`gold`]: resTax } },
                    { new: true }
                ).populate("inventory")
                .populate("statblock")
                .populate([{ path: 'inventory', populate: [{ path: 'weapon' }, { path: 'armor' }, { path: 'slot1' }, { path: 'slot2' }, { path: 'slot3' }, { path: 'slot4' }, { path: 'bag' }] }]).exec();
            };

            return { char };

        },

        removeCharacter: async (parent, { characterId }) => {
            return Character.findOneAndDelete({ _id: characterId });
        },

        removeAccount: async (parent, { accountId }) => {
            return Account.findOneAndDelete({ _id: accountId });
        },

    },
};

module.exports = resolvers;
