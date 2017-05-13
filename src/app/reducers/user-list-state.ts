import { createSelector } from 'reselect';
import { UserActions } from '../actions/user-actions';
import { User } from '../models/user';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';

//so I can retrieve by idx
export interface State {
ids: string[];
entities: {[id:string]:User};
loaded: boolean;
selectedId: string|null;
};

export const initialState: State = {
    ids:[],
    entities:{},
    loaded: false,
    selectedId: '-1'
};

export  function reducer(state = initialState, action: Action): State {
 
    switch (action.type) {
       case UserActions.LOAD_USERS:{
           return {
                ids: [],
                entities: {},
                loaded: false,
                selectedId:state.selectedId
            };
       
       }
    
        case UserActions.LOAD_USERS_SUCCESS: {
            const entities = action.payload.entities.users;
            const ids = action.payload.result;
            
            let ret= {
                ids: [...state.ids,...ids],
                entities: Object.assign({}, state.entities,entities),
                loaded: true,
                selectedId:state.selectedId
            };

            
            return ret;
        }
        
          case UserActions.ADD_USER_SUCCESS: {
              const user = action.payload;
               let res= {
                   ids:[...state.ids,user.id],
                   entities: Object.assign({}, state.entities,{[user.id]:action.payload}),
                   loaded: true,
                   selectedId: state.selectedId
              };

              console.log('add redux= '+JSON.stringify(res));
              return res;
          }

             case UserActions.SELECT_USER: {
              const id = action.payload;
               return {
                   ids: state.ids,
                   entities: state.entities,
                   loaded: true,
                   selectedId: id
              };
          }

          case UserActions.SAVE_USER_SUCCESS: {
              const user = action.payload;
              let res= {
                   ids:[...state.ids],
                   entities: Object.assign({}, state.entities,{[user.id]:action.payload}),
                   loaded: true,
                   selectedId: state.selectedId
              };

              console.log('edit redux='+JSON.stringify(res));
              return res;
            }
        

      case UserActions.DELETE_USER_SUCCESS: {
            let newUsers=[];
            const newIds=state.ids.filter(id=> id!=action.payload);
             newIds.forEach(id=>newUsers.push(state.entities[id]));


             const newUserPayload = newUsers.reduce(
                (entities: { [id: string]: User }, user: User) => {
                    return Object.assign(entities, { [user.id]: user});
                 }, {});

            console.log('delete redux= '+action.payload);
            
            const obj = {
                 ids: newIds,
                 entities: newUserPayload, 
                 loaded: true,
                 selectedId:state.selectedId

               };
               console.log('delete:'+JSON.stringify(obj));
              return obj;     
        }
          default: {
              return state;
          }
     }



     
}



export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedId;


export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});