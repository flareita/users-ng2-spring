import { Store } from '@ngrx/store';
import { OnDestroy, Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { DialogModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import { getIds, getAll } from '../../reducers/user-list-state';

import { SearchActions } from '../../actions/search-actions';
import { UserActions } from '../../actions/user-actions';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit , OnDestroy{

  
  usersObs$: Observable<User[]>;
  searchObs$: Observable<User[]>;
  users$: Observable<User[]>;
  alive=true;

  
  
  searchTerm$ = new Subject<string>();
  searchUsers$: Observable<User[]>;
  query: string;
  display: boolean = false;

  constructor(
    private store: Store<fromRoot.State>,
    private searchAction: SearchActions,
    private userAction: UserActions,

  ) { }

ngOnDestroy() {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  
  this.alive=false;
  this.searchTerm$.unsubscribe();
}

  ngOnInit() {

   

    this.searchTerm$.subscribe(query => this.search(query)); 
     

    //the users
    this.users$=this.usersObs$=this.store.select('users').filter(x=>x!=undefined)
      .flatMap(()=>this.store.select<User[]>(fromRoot.getUsers))
      .takeWhile(()=>this.alive=true);

     //search 
      this.searchObs$= this.store.select<User[]>(fromRoot.getSearchResults).takeWhile(()=>this.alive=true);
  
        
  }

nextFlow(q:string){
  this.searchTerm$.next(q);
}

  search(stringa: string) {
    console.log('query is '+ stringa);
    if(stringa===''){
         this.users$=this.usersObs$;
    }
     else{
        this.store.dispatch(this.searchAction.searchUsers(stringa))
        this.users$=this.searchObs$;
    }
  }


  showDialog() {
    this.display = true;
  }

  public deleteUser(id: number) {
  //  e.stopPropagation();
    console.log("delete id=" + id);

    this.store.dispatch(this.userAction.deleteUser(id));

  }
}
