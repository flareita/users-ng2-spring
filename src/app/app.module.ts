import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import {UserService} from './user.service';
import {DialogModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact',component: ContactComponent},
  { path: 'main',component: MainComponent},
  { path: 'addUser/:id',component: UserComponent},
  { path: 'addUser',component: UserComponent},
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
     MainComponent,
     UserComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     DialogModule,
     PanelModule,
     ButtonModule,
   RouterModule.forRoot(appRoutes)
  ],
   providers: [UserService],
     bootstrap: [AppComponent]
})
export class AppModule { }
