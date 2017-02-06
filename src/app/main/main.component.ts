import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {DialogModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
 
})
export class MainComponent implements OnInit {

  users:any=[];
  searchTerm=new Subject<string>();
  display: boolean = false;

  constructor(private service:UserService) {
  console.log('sono in main');

   }

  public list(){
     this.service.getUsers().subscribe(req=>this.users=req);
   
  }

  ngOnInit() {
   // console.log(this.service.test());
   this.list();
    console.log(JSON.stringify(this.users));
  }
   
search(stringa:string){
  
  console.log("la stringa e'"+stringa);

  // this.users = this.searchTerm
  //     .debounceTime(300)        // wait for 300ms pause in events
  //     .distinctUntilChanged()   // ignore if next search term is same as previous
  //     .switchMap(term => term   // switch to new observable each time
  //       // return the http search observable
  //       ? this.service.search(term)
  //       // or the observable of empty heroes if no search term
  //       : Observable.of<User[]>([]))
  //     .catch(error => {
  //       // TODO: real error handling
  //       console.log(`Error in component ... ${error}`);
  //       return Observable.of<User[]>([]);
  //     });
  this.searchTerm
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
         this.service.search(stringa).subscribe(x=>this.users=x);
        



}

 showDialog() {
        this.display = true;
    }

 public delUser(id:number,e:Event){
  e.stopPropagation();
  console.log("delete id="+id);
  this.service.deleteUser(id).subscribe(
    res=>res,
    e=>console.log(e),
    ()=>this.list()
  );  
  
  
  
 }

}
