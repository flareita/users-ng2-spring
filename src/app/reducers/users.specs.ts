import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const state = [
  {
    "id": 117,
    "username": "pippo",
    "password": "pippo",
    "email": "pippo@flare.it",
    "serial": 1,
    "country": "italy"
  },
  {
    "id": 135,
    "username": "mizzillo2",
    "password": "ciao",
    "email": "ciao",
    "serial": 1,
    "country": "italy"
  }
]

const normalizedData = normalize(state,  new schema.Array(user));


console.log(normalizedData);

/*
{ 
     entities: 
                    { users: {
                                       '117': [Object], 
                                       '135': [Object] 
                                   } 
                    },
  result: [ 117, 135 ] 
}



*/