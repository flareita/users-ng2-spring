import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


const states_url:string = 'https://restcountries.eu/rest/v2/all';


@Injectable()
export class LookupService {


  constructor(private  http:Http) {

  }


public getStates(){
    //cached request 
    console.log("states");

   return  this.http.get(states_url)
    .map(res => res.json())
    .publishReplay(1)
    .refCount();

}
}
