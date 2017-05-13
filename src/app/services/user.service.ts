import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { User } from '../models/user'

@Injectable()
export class UserService {


  base_uri = "http://localhost:8080/demo/api/users/";
  get_username_uri = "http://localhost:8080/demo/api/usernames/";

  constructor(private http: Http) { }

  public getUsers() {
    console.log("calling getUsers");
    return this.http.get(this.base_uri)
      .map(res => res.json());

  }

  public editUser(user: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let payload = JSON.stringify(user);

    return this.http.put(this.base_uri + user.id, payload, options).map(x=>x.json());
  }


  public getUser(id: any) {
    return this.http.get(this.base_uri + id)
      .map(res => res.json());

  }


  public addUser(user: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let payload = JSON.stringify(user);

    return  this.http.post(this.base_uri, payload, options).map(x=>x.json());


  }


  public search(term: string) {

    return this.http.get(this.get_username_uri + term).map(x => x.json());
  }

  public deleteUser(id) {

    console.log("deleting user " + id);
     return this.http.delete(this.base_uri + id).map(x => x.json());
  
  }



}
