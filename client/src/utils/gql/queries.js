import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_OPPONENT = gql`
  query opponent {
    opponent {
      _id
        name
        gold
        wins
        deaths
        rating
        inventory {
          _id
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

export const QUERY_SHOP = gql`
  query shop {
    item {
      _id
        name
        gold
        wins
        deaths
        rating
        inventory {
          _id
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



