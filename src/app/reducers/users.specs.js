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
//const normalizedData = normalize(state,  new schema.Array(user));
var normalizedData = normalizr_1.normalize(state, user);
console.log(normalizedData);
