import {UserService} from '../services/user.service';
import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {UserActions} from '../actions/user-actions';
import {SearchActions} from '../actions/search-actions';

import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserEffects {

      constructor (
        private update$: Actions,
        private searchActions: SearchActions,
        private userActions: UserActions,
        private service: UserService,
) {}



@Effect() searchUsers$ = this.update$
        .ofType(SearchActions.SEARCH_USERS)
        .debounceTime(500)
        .map(action => action.payload)
        .switchMap(
                query => {
                if (query === '') {
                         return empty();
                }
                const nextSearch$ = this.update$.ofType(SearchActions.SEARCH_USERS).skip(1);
        return this.service.search(query)
        .takeUntil(nextSearch$)
        .map(users =>  this.searchActions.searchUsersSuccess(users))
        .catch(() => of(this.searchActions.searchUsersSuccess([])));
    });

                
   /* at startup 
   */             

 @Effect() loadUsers$ = this.update$
        .ofType(UserActions.LOAD_USERS)
        .startWith(this.userActions.loadUsers())
        .switchMap(() => this.service.getUsers())
         .map(users => this.userActions.loadUsersSuccess(users))
         .catch(error => of(this.userActions.loadUsersFailed(error))
       
        );

@Effect() getUser$ = this.update$
        .ofType(UserActions.LOAD_USER)
        .map(action => action.payload)
        .switchMap(id => this.service.getUser(id))
        .map(user => this.userActions.loadUserSuccess(user));

 @Effect() saveHero$ = this.update$
        .ofType(UserActions.SAVE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.editUser(user))
        .map(user => this.userActions.saveUserSuccess(user));

   @Effect() addUser$ = this.update$
        .ofType(UserActions.ADD_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.addUser(user))
        .map(user => this.userActions.addUserSuccess(user));


@Effect() deleteHero$ = this.update$
        .ofType(UserActions.DELETE_USER)
        .map(action => action.payload)
       .switchMap(id => this.service.deleteUser(id))
        .map((id) => this.userActions.deleteUserSuccess(id));


}
