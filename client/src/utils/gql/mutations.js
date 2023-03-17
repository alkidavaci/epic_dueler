import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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
mutation addCharacter($name: String!) {
    addCharacter(name: $name) {  
        character {
          _id
          name
       
      }
    }
  }
`;

export const UPDATE_INVENTORY = gql`
mutation updateInventory($characterId: ID!, $inventoryId: ID!, $itemId: ID!, $action: String!, $slot: String) {
    updateInventory(characterId: $characterId, inventoryId: $inventoryId, itemId: $itemId, action: $action, slot: $slot) {

        _id
        name
        gold
        wins
        deaths
        rating
        inventory {
          weapon {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          armor {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          slot1 {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          slot2 {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          slot3 {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          slot4 {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
          bag {
            _id
            name
            icon
            itemtype
            price
            value
            description
          }
        }
        statblock {
          hp
          range
          attack
          defense
          crit
          parry
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

export const REMOVE_ACCOUNT = gql`
mutation removeAccount($accountId: ID!) {
    removeAccount(accountId: $accountId) {
      account {
        _id
        username    
      }
    }
  }
`;
