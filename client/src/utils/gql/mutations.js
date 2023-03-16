import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      account {
        _id
        username
      }
    }
  }
`;

export const ADD_ACCOUNT = gql`
mutation addAccount($username: String!, $email: String!, $password: String!) {
    addAccount(username: $username, email: $email, password: $password) {
      token 
      account {
        _id
        username
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
mutation addCharacter($username: String!, $name: String!) {
    addCharacter(username: $username, name: $name) {
      account {
        username
        character {
          _id
          name
       }
      }
    }
  }
`;

export const UPDATE_INVENTORY = gql`
mutation updateInventory($characterId: ID!, $inventoryId: ID!, $itemId: ID!, $action: String!, $slot: String) {
    updateInventory(characterId: $characterId, inventoryId: $inventoryId, itemId: $itemId, action: $action, slot: $slot) {
      character {
        _id
        name
        gold
        rating
        statblock
        inventory
      }
    }
  }
`;

export const UPDATE_CHARACTER = gql`
mutation updateCharacter($name: String!, $win: Boolean!, $gain: Int!) {
    updateCharacter(name: $name, win: $win, gain: $gain) {
      character {
        _id
        name
        gold
        wins
        deaths
      }
    }
  }
`;

export const REMOVE_CHARACTER = gql`
mutation removeCharacter($characterId: ID!) {
    removeCharacter(characterId: $characterId) {
      character {
        _id
        name        
      }
    }
  }
`;

export const ACCOUNT = gql`
mutation removeAccount($accountId: ID!) {
    removeAccount(accountId: $accountId) {
      account {
        _id
        username    
      }
    }
  }
`;
