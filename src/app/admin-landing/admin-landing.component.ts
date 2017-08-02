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
isDeparmentSelected:boolean;

  ngAfterViewInit(){
    this.set();
  }

  ngOnInit() {
this.isDeparmentSelected = false;
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

//this.fetchSpecificCategory();
/* var data = {"A Key": 34, "Another Key": 16, "Last Key": 10};

var data1 = [],
    data2 = [];

for (var property in data) {

   if ( ! data.hasOwnProperty(property)) {
      continue;
   }

   data1.push(property);
   data2.push(data[property]);


}

console.log(data1);
console.log(data2);
 */  }
data3=[];
selectCategory(v){
  
  this.selectedCategory= v;
}
selectDepartment(v){
  this.selectedDepartment = v;
  //this.isDepartmentSelected = true;
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
//console.log(this.y);
})
}

fetchDepartments(){
  this.allDepartmentsList = [];
  this.fb.fetchDepartments().subscribe(data=>{
  var arr1;
  var arr2:Observable<any[]> = data;
  arr1 = arr2;
this.allDepartmentsList = $.map(arr1, function(el) { return el })
//console.log(this.allDepartmentsList);
})
}

fetchSubCategories(){
  this.fb.fetchSubCategories().subscribe(data=>{
  var arr1;
  var arr2:Observable<any[]> = data;
  arr1 = arr2;
this.allSubCategoriesList = $.map(arr1, function(el) { return el })
//console.log(this.allSubCategoriesList);
})
}


fetchSpecificDepartment(){
  console.log(this.selectedDepartment);
  this.allCategoriesList=[];
  this.allDepartmentsList=[];
  this.fb.fetchSpecificDepartment(this.selectedDepartment).subscribe(data=>{
    for(var category in data){
      if( !data.hasOwnProperty(category)){
        continue
      }
      this.selectedDepartmentsList.push(category);
      this.allCategoriesList.push(category);
    }
     //this.allCategoriesList = this.selectedCategoriesList;
    console.log(this.allCategoriesList);
    console.log(this.selectedDepartmentsList);
  })
}

selectedDepartmentsList=[];
selectedCategoriesList=[];

chooseDepartment(x){
  this.isDeparmentSelected = true;
  this.selectedDepartment = x;
  this.fetchSpecificDepartment();
  
}

chooseCategory(x){
  this.isCategorySelected = true;
  this.selectedCategory = x;
  this.fetchSpecificCategory();
}

chooseSubCategory(x){
  this.selectedSubCategory = x;
  this.fetchSpecificSubCategory();
}
isCategorySelected:boolean;
selectedSubCategory;
fetchSpecificCategory(){
console.log(this.selectedCategory);
this.selectedCategoriesList=[];
  this.fb.fetchSpecificCategory(this.selectedDepartment, this.selectedCategory).subscribe(data=>{
    for(var category in data){
      if( !data.hasOwnProperty(category)){
        continue
      }
      this.selectedCategoriesList.push(category);
    
    }
   
    console.log(this.selectedCategoriesList);
  })
}

fetchSpecificSubCategory(){
  console.log(this.selectedSubCategory);
  this.selectedSubCategorieList=[];
  this.fb.fetchSpecificSubCategory(this.selectedDepartment,this.selectedCategory,this.selectedSubCategory).subscribe(data=>{
    for(var SubCategory in data){
      if( !data.hasOwnProperty(SubCategory)){
        continue;
      }this.selectedSubCategorieList.push(SubCategory);
    }console.log(this.selectedSubCategorieList);
  })
}
selectedSubCategorieList=[];
  addProduct(){
     this.products = this.db.list('/Products_List/'+this.selectedDepartment + '/'+ this.selectedCategory + '/' + this.selectedSubCategory);
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
