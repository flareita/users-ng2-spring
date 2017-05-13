import { createSelector } from 'reselect';

import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import * as fromSearch from './search-state';
import * as fromUserList from './user-list-state';
import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
  search: fromSearch.State;
  users: fromUserList.State;
  router: fromRouter.RouterState;
}


 const reducers = {
     search: fromSearch.reducer, 
     users: fromUserList.reducer,
    router: fromRouter.routerReducer
 };


const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}



 export const getUsersState = (state: State) =>  state.users;
 export const getSearchState = (state: State) => state.search;
 
 

 export const getUserEntities = createSelector(getUsersState, fromUserList.getEntities);
 export const getUserIds = createSelector(getUsersState, fromUserList.getIds);
 export const getSelecteUserId = createSelector(getUsersState, fromUserList.getSelectedId);
 export const getSelectedUser = createSelector(getUsersState, fromUserList.getSelected);



export const getSearchUserIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);


export const getSearchResults = createSelector(getUserEntities, getSearchUserIds, (users, searchIds) => {
  return searchIds.map(id => users[id]);
});


export const getUsers = createSelector(getUserEntities, getUserIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

