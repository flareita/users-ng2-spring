import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {USER_SCHEMA,USER_ARRAY} from '../schemas/schema';
import {normalize} from 'normalizr';
@Injectable()
export class SearchActions {

  constructor() { }

 

static SEARCH_USERS = 'Search Users';
  public searchUsers(query:String): Action {
    return {
      type: SearchActions.SEARCH_USERS,
      payload: query
    };
  }

  static SEARCH_USERS_SUCCESS = 'Search Users Success';
  public searchUsersSuccess(users): Action {
      let normalized=normalize(users, USER_ARRAY);    
    
    return {
      type: SearchActions.SEARCH_USERS_SUCCESS,
      payload: normalized
    };
  }




}
