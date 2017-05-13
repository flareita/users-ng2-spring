import { normalize, schema } from 'normalizr';

export const USER_SCHEMA = new schema.Entity('users');
export const USER_ARRAY = new schema.Array(USER_SCHEMA);
