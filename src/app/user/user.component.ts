import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
 user:User=new User();
 id:any;
  constructor(private service:UserService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  
 
  this.id = this.route.params.switchMap(
   params => this.service.getUser(params['id']))
      .subscribe(result => {
    if (result) this.user = result; 
    else console.log('user error');
  });


 


        }


public addUser(){

 this.service.addUser(this.user).subscribe(
 res=>res,
 e=>console.log(e) ,
  ()=> this.router.navigate(['/main'])
 );
 
}

public editUser(){
console.log("edita"+JSON.stringify(this.user));
 this.service.editUser(this.user).subscribe(
 res=>res,
 e=>console.log(e) ,
  ()=> this.router.navigate(['/main'])
 );
}


public cancel(){
  this.user.username="";
  this.user.password="";
  this.user.email="";
  this.router.navigate(['/main'])

}
}
