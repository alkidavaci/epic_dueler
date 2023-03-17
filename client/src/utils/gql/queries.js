import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username 
      character {
        _id
        name
        gold
        wins
        deaths
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
        inventory {
          _id
        }
        statblock {
          _id
        } 
    }
  }
`;


