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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit {

  sub: any;
  users$: Observable<User[]>;
  searchTerm$ = new Subject<string>();
  query: string;
  display: boolean = false;

  constructor(
    private store: Store<fromRoot.State>,
    private searchAction: SearchActions,
    private userAction: UserActions,

  ) { }


  ngOnInit() {

    /* we wait for the first effect to be available on the store
    */

    this.searchTerm$.subscribe(query => this.search(query));

    //load the full store 
    //   this.users$=this.store.select('users').filter(x=>x!=undefined)
    // .flatMap( ()=>this.store.select<User[]>(fromRoot.getUsers));

    this.users$ = this.store.select<User[]>(fromRoot.getSearchResults);


  }



  search(stringa: string) {
    console.log(stringa);

    this.store.dispatch(this.searchAction.searchUsers(stringa.trim()))

  }


  showDialog() {
    this.display = true;
  }

  public delUser(id: number, e: Event) {
    e.stopPropagation();
    console.log("delete id=" + id);

    this.store.dispatch(this.userAction.deleteUser(id));

  }
}
