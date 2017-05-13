import {EffectsModule} from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { AppLayout } from './containers/layout/app.layout';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MainComponent } from './containers/main/main.component';
import {UserService} from './services/user.service';
import {LookupService} from './services/lookup.service';

import {DialogModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { UserComponent } from './containers/user/user.component';
import {Store, StoreModule} from '@ngrx/store';
import * as redux from './reducers';
import {UserEffects} from './effects/user-effects';
import {UserActions} from './actions/user-actions';
import {SearchActions} from './actions/search-actions';
import { SearchComponent } from './components/search/search.component';
import { ShowUserComponent } from './components/show-user/show-user.component';

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
    AppLayout,
    AboutComponent,
    ContactComponent,
     MainComponent,
     UserComponent,
     SearchComponent,
     ShowUserComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
     DialogModule,
     PanelModule,
     ButtonModule,
     StoreModule.provideStore(redux.reducer),
     EffectsModule.run(UserEffects),
     RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

   RouterModule.forRoot(appRoutes)
  ],
   providers: [UserService, LookupService, UserActions,SearchActions],
     bootstrap: [AppLayout]
})
export class AppModule { }
