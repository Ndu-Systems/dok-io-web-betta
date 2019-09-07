 import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staff$:Observable<any>;
  user:any;
  showAddStaff: boolean;
  searchText: any;
  p:any;

  constructor(private loginService:LoginService) {
    this.loginService.currentUser.subscribe(u => this.user = u);
    this.staff$ = this.loginService.getUserByParentId(this.user.UserId);
  }

  ngOnInit() {

  }
  showModal(){
    this.showAddStaff= true;
  }
  closeModal(e: boolean) {
    this.showAddStaff = e;
    this.staff$ = this.loginService.getUserByParentId(this.user.UserId);
  }
}
