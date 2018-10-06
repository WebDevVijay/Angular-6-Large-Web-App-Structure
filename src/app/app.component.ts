import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 6';
  constructor(private router: Router,
    private storageService: StorageService,
  ) {
  }
  ngOnInit() {
    var UserDataKey = "UserData";
    let UserData: any = this.storageService.read(UserDataKey);
    if (UserData && UserData.user_id) {
      this.router.navigate(['contact-book']); // logged in so redirect to contact listing page
    }
    else {  // not logged in so redirect to landing page
      this.router.navigate(['home/welcome']);
    }
  }
}
