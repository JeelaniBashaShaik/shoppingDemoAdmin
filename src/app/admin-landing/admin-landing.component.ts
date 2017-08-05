import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FireBaseService } from './../shared/fire-base.service';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

declare var $:any;
declare var Materialize :any;

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {



  constructor(public router:Router,public db: AngularFireDatabase, public fb: FireBaseService) { 


  }
isDeparmentSelected:boolean;

goToAddProduct(){
  this.router.navigateByUrl('add-product');
}

  ngOnInit() {
  }
goToViewList(){
  this.router.navigateByUrl('view-catalog');
}
}