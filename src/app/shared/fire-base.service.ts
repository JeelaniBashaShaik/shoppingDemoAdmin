import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
@Injectable()
export class FireBaseService {

  constructor(private http:Http) { }

  fetchCategories(){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/CategoriesList.json').map(res => res.json())
  }

  fetchDepartments(){
     return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/DepartmentsList.json').map(res => res.json())
  }

  fetchSubCategories(){
      return this.http.get('https://samplesite-dd655.firebaseio.com/Lists/SubCategoriesList.json').map(res => res.json())
  }
}
