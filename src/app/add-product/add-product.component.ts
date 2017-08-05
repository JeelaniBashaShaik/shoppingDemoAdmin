import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FireBaseService } from './../shared/fire-base.service';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';


import { Product } from './../shared/models';

declare var $:any;
declare var Materialize :any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
t1DepartmentName:string;
  t1CategoryName:string;
  t1SubCategoryName:string;

  t2SelectedDepartment:string;
  t2CategoryName:string;

  t3SelectedDepartment:string;
  t3SelectedCategory:string;
  t3SubCategoryName:string;
  
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

  constructor(public router: Router,public db: AngularFireDatabase, public fb: FireBaseService) { 
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
    this.disableT1Create = true;
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
  if(this.selectedDepartment && this.selectedCategory !=null){
        Materialize.toast('Sub Category Added Successfully', 2000)
  }else{
        Materialize.toast('Sub Category was not Added Successfully', 2000)
  }
  this.flushAllVariables();
}

t2SelectDepartment(x){
  console.log(x);
  this.selectedDepartment = x;
}
newCategoryName;
newSubCategoryName;
selectedDepartment;
selectedCategory;
createCategory(){
  console.log(this.t2SelectedDepartment);
  console.log(this.t2CategoryName);
  this.categoriesList.push(this.t2CategoryName);
  this.products =this.db.list('/Products_List/'+this.selectedDepartment+'/'+this.t2CategoryName);
  this.products.push('');
 
  if((this.t2CategoryName && this.selectedDepartment)!= null){
    Materialize.toast('Category Added Successfully', 2000)
  }else{
    Materialize.toast('Category was not added Successfully', 2000)
  }
   this.flushAllVariables();
1}
createHierarchy(){
this.products = this.db.list('/Products_List/'+this.t1DepartmentName+'/'+this.t1CategoryName+'/'+this.t1SubCategoryName);
 this.products.push('');
 this.departmentsList.push(this.t1DepartmentName);
 this.categoriesList.push(this.t1CategoryName);
 this.subCategoriesList.push(this.t1SubCategoryName);
 if(this.t1DepartmentName && this.t1CategoryName && this.t1SubCategoryName){
  Materialize.toast('Hierarchy Created Successfully', 2000)
 }
 this.flushAllVariables();
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
console.log(this.allDepartmentsList);
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
  this.selectedDepartmentsList = [];
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
      this.flushAllVariables();
  }


  flushAllVariables(){
    this.Level1 = null;
    this.Level2=null;
    this.Level3=null;
    this.Level4=null;
    this.t1CategoryName = null;
    this.t1SubCategoryName=null;
    this.t1DepartmentName=null;
    this.t2CategoryName = null;
    this.t2SelectedDepartment = null;
    this.t3SelectedCategory = null;
    this.t3SelectedDepartment = null;
    this.t3SubCategoryName = null;
    this.allCategoriesList=[];
    this.allSubCategoriesList=[];
    this.selectedCategory = null;
    this.selectedDepartment = null;
    this.selectedSubCategory  = null;
    this.selectedCategoriesList = [];
    this.selectedSubCategorieList=[];
    this.isDeparmentSelected = false;
    this.isCategorySelected = false;
    this.newSubCategoryName = null;
    var x = Object.keys(this.productToBeAdded);
    /* for(var i=0;i<x.length;i++){
      this.productToBeAdded[x[i]] = null
    } */
    console.log(x);
    this.fetchDepartments();
  }
t4SelectDepartment(e){
this.productToBeAdded.parentDepartment = e;
this.isDeparmentSelected = true;
this.selectedDepartment = e;
 this.fetchSpecificDepartment();
}
t4SelectCategory(e){
this.productToBeAdded.parentCateogry = e;
this.isCategorySelected = true;
this.selectedCategory = e;
this.fetchSpecificCategory();
}

t4SelectSubCateogry(e){
this.productToBeAdded.parentSubCategory = e;
//this.selectedSubCategory = e;
}
  flushProduct(){
    this.productToBeAdded.parentCateogry = null;
    this.productToBeAdded.parentDepartment = null;
    this.productToBeAdded.parentSubCategory = null;
    this.productToBeAdded.productActualPrice = null;
    this.productToBeAdded.productBrand = null;
    this.productToBeAdded.productCurrentPrice = null;
    this.productToBeAdded.productFeatures = [];
    this.productToBeAdded.productId = null;
    this.productToBeAdded.productId = null;
    this.productToBeAdded.productShortDescription = null;
    this.productToBeAdded.productLongDescription = null;
    this.flushAllVariables();
    this.fetchDepartments();
  }

  checkForValues(event){
    for(var i=0;i<this.allDepartmentsList.length;i++){
      if(event.target.value === this.allDepartmentsList[i]){
        Materialize.toast("Name Already Exists",1500);
      }
    }
    if((this.t1CategoryName || this.t1DepartmentName || this.t1SubCategoryName) === null || undefined || ''){
      this.disableT1Create = true;
    }else{
      this.disableT1Create = false;
    }
  }
  disableT1Create:boolean;
  disableT2Reset:boolean;
}
