import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import { Product } from './../shared/models';

declare var $:any;
declare var Materialize :any;
@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {

  productToBeAdded:Product = new Product();
  products: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) { 
    this.products = db.list('/Products_List');
  }

  ngOnInit() {
      $(document).ready(function() {
  $('.modal').modal();
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
       
;
});
  }

  addProduct(){
     this.products = this.db.list('/Products_List/'+this.productToBeAdded.productCategory);
     if(this.productToBeAdded != null){
        console.log(this.productToBeAdded);
        this.productToBeAdded.productInCarts = 0;
        this.productToBeAdded.productInWishLists = 0;
        this.products.push(this.productToBeAdded);
        Materialize.toast('Product Added Successfully', 2000)
      }
    else{
        Materialize.toast('Please enter proper details', 2000)
    }
  }

}
