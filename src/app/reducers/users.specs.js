"use strict";
exports.__esModule = true;
var normalizr_1 = require("normalizr");
var user = new normalizr_1.schema.Entity('users');
var state = [
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
];
var normalizedData = normalizr_1.normalize(state, new normalizr_1.schema.Array(user));
it('should contain normalized data');
expect(normalizedData.result).toEqual([117, 135]);
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
