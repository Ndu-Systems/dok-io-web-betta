import { Component, OnInit, Input } from '@angular/core';
import { NavModel } from 'src/app/models';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  models: NavModel[];
  constructor() { }

  ngOnInit() {
    this.populateSideNav();
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

}
