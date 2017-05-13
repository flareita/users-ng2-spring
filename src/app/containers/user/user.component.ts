import {Validators, FormGroup,  FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit ,OnChanges} from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { State } from '../../reducers';
import { UserActions } from '../../actions/user-actions';
import * as fromRoot from '../../reducers';
import {LookupService} from '../../services/lookup.service';

@Component({

  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User();
  currentUser: User = new User();
  id: any;
  //no need to keep lookups in the state
  state$:Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private lookup: LookupService,
    private userAction: UserActions,
    private router: Router,
    private route: ActivatedRoute) { 

     
    }

 createForm() {
    this.userForm = this.fb.group({
      username: [this.user.username, Validators.required ],
      password: [this.user.password, Validators.required ],
      email: [this.user.email, Validators.required ],
      country: this.user.country
    });
  }

  ngOnInit() {

  //lookup 
  this.state$=this.lookup.getStates();


    this.id = this.route.params.map(
      params => this.store.dispatch(this.userAction.selectUser(params['id']))
    ).switchMap(() => this.store.select(fromRoot.getSelectedUser)).subscribe(user => this.currentUser = user);

      this.user = Object.assign({}, this.currentUser);
      this.createForm();
     

}

 public updateModel(){
    this.user.username=this.userForm.value.username;
    this.user.password=this.userForm.value.password;
    this.user.email=this.userForm.value.email;
    this.user.country=this.userForm.value.country;


//this.user=this.userForm.value;
 }


  public addUser() {
    this.updateModel();
    this.store.dispatch(this.userAction.addUser(this.user));
    this.router.navigate(['/main']);

  }

  public editUser() {
    console.log("edita" + this.userForm.value);
    this.updateModel();
    this.store.dispatch(this.userAction.saveUser(this.user));
    this.router.navigate(['/main']);
  }


  public cancel() {

    this.router.navigate(['/main'])

  }


onChange(newValue) {
    console.log(newValue);
    this.user.country=newValue;
 }

}
