import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { State } from '../../reducers';
import { UserActions } from '../../actions/user-actions';
import * as fromRoot from '../../reducers';

@Component({

  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  currentUser: User = new User();
  id: any;
  constructor(
    private store: Store<State>,
    private userAction: UserActions,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.id = this.route.params.map(
      params => this.store.dispatch(this.userAction.selectUser(params['id']))
    ).switchMap(() => this.store.select(fromRoot.getSelectedUser)).subscribe(user => this.currentUser = user);

      this.user = Object.assign({}, this.currentUser);
  }


  public addUser() {

    this.store.dispatch(this.userAction.addUser(this.user));
    this.router.navigate(['/main']);

  }

  public editUser() {
    console.log("edita" + JSON.stringify(this.user));
    this.store.dispatch(this.userAction.saveUser(this.user));
    this.router.navigate(['/main']);
  }


  public cancel() {

    this.router.navigate(['/main'])

  }
}
