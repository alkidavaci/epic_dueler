const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
  }

  type Mutation {

  }
`;

module.exports = typeDefs;
