import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLandingComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
