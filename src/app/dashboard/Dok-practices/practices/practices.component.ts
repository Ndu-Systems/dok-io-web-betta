import { PracticesService } from 'src/app/services/practices.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.scss']
})
export class PracticesComponent implements OnInit {

  practices$: Observable<any>;
  user: any;
  showAddPractice: boolean;
  searchText: any;
  p: any;


  constructor(private authiticateService: LoginService, private practicesService: PracticesService) {
    this.authiticateService.currentUser.subscribe(u => this.user = u);
    this.practices$ = this.practicesService.getPractices(this.user.UserId);

  }

  ngOnInit() {

  }
  showModal() {
    this.showAddPractice = true;
  }
  closeModal(e: boolean) {
    this.showAddPractice = e;
    this.practices$ = this.practicesService.getPractices(this.user.UserId);
  }
}
