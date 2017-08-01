import { Component, OnInit,AfterViewInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FireBaseService } from './../shared/fire-base.service';
import {Observable} from 'rxjs/Observable';


import { Product } from './../shared/models';

declare var $:any;
declare var Materialize :any;

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit,AfterViewInit {

  productToBeAdded:Product = new Product();
  products: FirebaseListObservable<any[]>;  
  departmentsList:FirebaseListObservable<any[]>;  
  categoriesList:FirebaseListObservable<any[]>;
  subCategoriesList:FirebaseListObservable<any[]>;  
  Level1:string;
  Level2:string;
  Level3:string;
  Level4:string;
  y=[];
  allDepartmentsList:Array<string> = [];
  allCategoriesList:Array<string> = [];
  allSubCategoriesList:Array<string> = [];
x= ['123','456'];

  constructor(public db: AngularFireDatabase, public fb: FireBaseService) { 
    this.products = db.list('/Products_List');
    this.departmentsList = db.list('/Lists/DepartmentsList');
    this.categoriesList = db.list('/Lists/CategoriesList');
    this.subCategoriesList = db.list('/Lists/SubCategoriesList');

  }

  ngAfterViewInit(){
    this.set();
  }

  ngOnInit() {

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
    },this.set()
  ); 
       
;
$('select').material_select();




  }

selectCategory(v){
  
  this.selectedCategory= v;
}
selectDepartment(v){
  this.selectedDepartment = v;
}
xyz;
set(){
  setTimeout(
    this.fetchCategories(),
    this.fetchDepartments(),
    this.fetchSubCategories(), 500);
}
  
createSubCategory(){
  this.subCategoriesList.push(this.newSubCategoryName);
  this.products = this.db.list('/Products_List/'+this.selectedDepartment+'/'+this.selectedCategory+'/'+this.newSubCategoryName);
  this.products.push('');
}
newCategoryName;
newSubCategoryName;
selectedDepartment;
selectedCategory;
createCategory(){
  this.categoriesList.push(this.newCategoryName);
  this.products =this.db.list('/Products_List/'+this.selectedDepartment+'/'+this.newCategoryName);
  this.products.push('');
}
createHierarchy(){
this.products = this.db.list('/Products_List/'+this.Level1+'/'+this.Level2+'/'+this.Level3);
console.log('/Products_List/'+this.Level1+'/'+this.Level2+'/'+this.Level3);
 this.products.push('');
 this.departmentsList.push(this.Level1);
 this.categoriesList.push(this.Level2);
 this.subCategoriesList.push(this.Level3);
 if(this.Level1 && this.Level2 && this.Level3){
  Materialize.toast('Hierarchy Created Successfully', 2000)
 }
 
}



fetchCategories(){
this.fb.fetchCategories().subscribe(data=>{
  var arr1;
  var arr2:Observable<any[]> = data;
  arr1 = arr2;
this.allCategoriesList = $.map(arr1, function(el) { return el })
this.y = this.allCategoriesList;
console.log(this.y);
})
}

fetchDepartments(){
  this.fb.fetchDepartments().subscribe(data=>{
  var arr1;
  var arr2:Observable<any[]> = data;
  arr1 = arr2;
this.allDepartmentsList = $.map(arr1, function(el) { return el })
console.log(this.allDepartmentsList);
})
}

fetchSubCategories(){
  this.fb.fetchSubCategories().subscribe(data=>{
  var arr1;
  var arr2:Observable<any[]> = data;
  arr1 = arr2;
this.allSubCategoriesList = $.map(arr1, function(el) { return el })
console.log(this.allSubCategoriesList);
})
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
