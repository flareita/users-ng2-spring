import { Component, OnInit } from '@angular/core';
import {DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     console.log('sono in about');
  }


 display: boolean = false;

    showDialog() {
        this.display = true;
    }


}
