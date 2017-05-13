import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const state = [
  {
    "id": 117,
    "username": "test",
    "password": "test",
    "email": "test@flare.it",
    "serial": 1,
    "country": "italy"
  },
  {
    "id": 135,
    "username": "test2",
    "password": "test",
    "email": "test2@flare.it",
    "serial": 1,
    "country": "italy"
  }
]

const normalizedData = normalize(state,  new schema.Array(user));

it('should contain normalized data',()=>(
   expect(normalizedData.result).toEqual([117,135])));

console.log(normalizedData);
console.log(normalizedData.entities);
console.log(normalizedData.result);


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