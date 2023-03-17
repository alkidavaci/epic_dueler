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



