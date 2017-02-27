import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
@Injectable()
export class UserActions {

  constructor() { }

  static LOAD_USERS = 'Load Users';
  public loadUsers(): Action {
    return {
      type: UserActions.LOAD_USERS
    };
  }

  static LOAD_USERS_SUCCESS = 'Load Users Success';
  public loadUsersSuccess(users): Action {
    console.log('LOAD'+JSON.stringify(users));
    return {
      type: UserActions.LOAD_USERS_SUCCESS,
      payload: users
    };
  }


  static LOAD_USERS_FAILED = 'Load Users Failed';
  public loadUsersFailed(error): Action {
    return {
      type: UserActions.LOAD_USERS_FAILED,
      payload: error
    };
  }



  static LOAD_USER = 'Load User';
  public loadUser(id): Action {
    return {
      type: UserActions.LOAD_USER,
      payload: id
    };
  }

  static LOAD_USER_SUCCESS = 'Load User Success';
  public loadUserSuccess(user): Action {
    return {
      type: UserActions.LOAD_USER_SUCCESS,
      payload: user
    };
  }

  static SAVE_USER = 'Save User';
  public saveUser(user): Action {
    return {
      type: UserActions.SAVE_USER,
      payload: user
    };
  }


  static SAVE_USER_SUCCESS = 'Save User Success';
  public saveUserSuccess(user): Action {
    return {
      type: UserActions.SAVE_USER_SUCCESS,
      payload: user
    };
  }

  static SELECT_USER = 'Select User';
  public selectUser(id): Action {
    return {
      type: UserActions.SELECT_USER,
      payload: id
    };
  }

static ADD_USER = 'Add User';
  public addUser(user): Action {
    return {
      type: UserActions.ADD_USER,
      payload: user
    };
  }



  static ADD_USER_SUCCESS = 'Add User Success';
  public addUserSuccess(user): Action {
    return {
      type: UserActions.ADD_USER_SUCCESS,
      payload: user
    };
  }

  static DELETE_USER = 'Delete User';
  public deleteUser(id): Action {
    return {
      type: UserActions.DELETE_USER,
      payload: id
    };
  }


  static DELETE_USER_SUCCESS = 'Delete User Success';
  public deleteUserSuccess(id): Action {
    return {
      type: UserActions.DELETE_USER_SUCCESS,
      payload:id
  
    };
  }



}
