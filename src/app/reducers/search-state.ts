import { UserActions } from '../actions/user-actions';
import { SearchActions } from '../actions/search-actions';
import { User } from '../models/user';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


export interface State {
  ids: string[];
  loading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  loading: false,
  query: ''
};

export  function reducer (state = initialState, action: Action): State {

    switch (action.type) {
        case SearchActions.SEARCH_USERS: {
            const query = action.payload;
             if (query === '') {
               return {
            ids: [],
            loading: false,
            query
            };
         }
         return Object.assign({}, state, {
        query,
        loading: true
      });
    }
     case SearchActions.SEARCH_USERS_SUCCESS: {
    const users = action.payload;
    let obj= {
        ids: users.map(user => user.id),
        loading: false,
        query: state.query
      };
    
     console.log(JSON.stringify(obj));
    return obj;
    }

        default: {
            return state;
        }

    }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
