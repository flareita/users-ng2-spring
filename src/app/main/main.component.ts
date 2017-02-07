import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { DialogModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit {

  users: any = [];
  searchTerm$ = new Subject<string>();
  display: boolean = false;

  constructor(private service: UserService) {
    console.log('sono in main');

  }

  public list() {
    this.service.getUsers().subscribe(req => this.users = req);

  }

  ngOnInit() {

    this.list();
    //-- search
    this.searchTerm$.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.search(term)).subscribe(res => this.users = res);
  }


  search(stringa: string) {
    console.log(stringa);

    //workaround (didn't have time to fix it properly)  
    return stringa.trim() !== "" ? this.service.search(stringa.trim()) : this.service.getUsers();

  }

  showDialog() {
    this.display = true;
  }

  public delUser(id: number, e: Event) {
    e.stopPropagation();
    console.log("delete id=" + id);

    this.service.deleteUser(id)
      .flatMap(res => this.service.getUsers())
      .subscribe(list => this.users = list,
      e => console.log(e));

  }

}
