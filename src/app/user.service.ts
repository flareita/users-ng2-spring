import { Injectable } from '@angular/core';
import {Http,Response,Request,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/do' ;
import 'rxjs/add/operator/map' ;
import {User} from './user'

@Injectable()
export class UserService {

 
  get_users_uri="http://localhost:8080/demo/api/users";
  add_user_uri="http://localhost:8080/demo/api/user/add";
  del_user_uri="http://localhost:8080/demo/api/delete/";
  get_user_uri="http://localhost:8080/demo/api/user/";
  edit_user_uri="http://localhost:8080/demo/api/user/edit/";
  get_username_uri="http://localhost:8080/demo/api/username/";
  
  constructor(private http:Http) { }

public getUsers(){
  console.log("calling getUsers");
  return this.http.get(this.get_users_uri)
  .map(res =>  res .json());
     
} 

public editUser(user:any){
let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 let payload = JSON.stringify(user);

  return this.http.put(this.edit_user_uri+user.id,payload,options);
     
} 


public getUser(id:any){
  return this.http.get(this.get_user_uri+id)
  .map(res =>  res .json());
     
} 


public addUser(user:User){
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 let payload = JSON.stringify(user);
 
console.log("adding user");
  return this.http.post(this.add_user_uri,payload,options);
  

}


public search(term:string){

  return this.http.get(this.get_username_uri+term).map(x=>x.json());
}

public deleteUser(id){
 
console.log("deleting user "+id);
  return this.http.delete(this.del_user_uri+id);
  
}



}
