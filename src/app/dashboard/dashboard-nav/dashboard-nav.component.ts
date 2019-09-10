import { Component, OnInit, Input } from '@angular/core';
import { NavModel } from 'src/app/models';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  models: NavModel[];
  user: any;
  currentUser: any;
  constructor(
    private authicateService: LoginService
  ) { }

  ngOnInit() {
    this.populateSideNav();
    // get userid
    this.authicateService.currentUser.subscribe(u => (this.currentUser = u));
    // get user details
    this.authicateService.getFullUserDetails(this.currentUser.UserId).subscribe(r => {
      this.user = r;
      // User not verified
    });

  }

  populateSideNav() {
    this.models = [] = [
      {
        Name: 'dashboard',
        Link: '/dashboard'
      },
      {
        Name: 'patients',
        Link: 'patients'
      }
    ];
  }


  logout() {
    this.authicateService.logout();
  }

}
