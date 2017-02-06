import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
 user:User=new User();
 id:any;
  constructor(private service:UserService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  
   this.id = this.route.params.subscribe(
     params => {
               this.id = +params['id']; // (+) converts string 'id' to a number
              
                console.log("id="+this.id); 
              if(this.id!== undefined&&this.id!==null){
              console.log("edit"+this.id);
              this.service.getUser(this.id).subscribe(res=>this.user=res);
               }
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
