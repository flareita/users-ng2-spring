import {Output, Input,  Component,   OnInit,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()  query:string;
  @Output() flow = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}
