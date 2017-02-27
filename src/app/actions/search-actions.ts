import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
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
    return {
      type: SearchActions.SEARCH_USERS_SUCCESS,
      payload: users
    };
  }




}
