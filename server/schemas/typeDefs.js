const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Account {
    _id: ID!
    username: String!
    email: String!
    password: String!
    character: Character

  }

  type Character {
    _id: ID!
    name: String!
    gold: Int!
    wins: Int!
    deaths: Int!
    inventory: Inventory!
    statblock: StatBlock!
    rating: Int!

  }

  type Inventory {
    _id: ID!
    weapon: Item
    armor: Item
    slot1: Item
    slot2: Item
    slot3: Item
    slot4: Item
    bag: [Item]
  }

  type Item {
    _id: ID!
    name: String!
    icon: String!
    itemtype: String!
    price: Int!
    value: String!
    description: String!
  }

  type StatBlock {
    _id: ID!
    hp: Int!
    range: Int!
    attack: Int!
    defense: Int!
    crit: Int!
    parry: Int!

  }

  type Auth {
    token: ID!
    account: Account
  }

  type Query {
    me: Account
    opponent(_id: ID!): Character
    shop: [Item]
    characters: [Character]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addAccount(username: String!, email: String!, password: String!): Auth
    addCharacter(username: String!, name: String!): Character
    updateCharacter(name: String!, win: Boolean!, gain: Int!): Character
    updateInventory(characterId: ID!, inventoryId: ID!, itemId: ID!, action: String!, slot: String): Inventory
    removeCharacter(characterId: ID!): Character
    removeAccount(accountId: ID!): Account


  }
`;

module.exports = typeDefs;
