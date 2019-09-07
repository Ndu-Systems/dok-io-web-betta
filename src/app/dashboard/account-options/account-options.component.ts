import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
  ExitModalEventEmmiter> = new EventEmitter();
  constructor(
    private router: Router,
    private authicateService: LoginService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.closeModalAction.emit({
     close: true
    });
  }

  logout() {
        this.authicateService.logout();
       this.router.navigate(['/']);
     }
}
