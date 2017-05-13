import {User} from '../../models/user';
import {Output, Input,  Component,   OnInit,EventEmitter} from '@angular/core';

@Component({
//using attribute selector
  selector: '[line-item]',
  templateUrl: './show-user.component.html'
})
export class ShowUserComponent implements OnInit {

@Input() 
user:User;
@Output()
delete=new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
