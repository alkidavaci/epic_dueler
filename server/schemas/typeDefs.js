const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Account {
    _id: ID!
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
    isfighting: Boolean!

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
    user: Account
  }

  type Query {
    me: Account
    opponent: Character
    shop: [Item]
    characters: [Character]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addAccount(username: String!, email: String!, password: String!): Auth

  }
`;

//queries:
// me
module.exports = typeDefs;
