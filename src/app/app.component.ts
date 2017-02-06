import { Component } from '@angular/core';
import {DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = 'ng2 spring poc';

 display: boolean = false;

    showDialog() {
        this.display = true;
    }

}
