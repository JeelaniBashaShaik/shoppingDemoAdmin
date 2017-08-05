import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import{ Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Home';
   items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase, public router:Router) {
    this.items = db.list('/Items');
    console.log(this.items);
  }

  goToAdminHome(){
    this.router.navigateByUrl('admin-landing');
  }
}
