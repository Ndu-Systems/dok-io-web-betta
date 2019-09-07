import { SpinnerService } from './../../services/spinner.service';
import { CURRENT_USER } from './../../shared/config';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 import { Router, ActivatedRoute } from '@angular/router';
import { ExitModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
  @Output() closeModalAction: EventEmitter<
    ExitModalEventEmmiter
  > = new EventEmitter();
  returnUrl: string;
  email = 'doc@mail.com';
  password = 'pass';
  error;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
  ) {
    if (this.loginService.currentUserValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: [null, Validators.required]
    });

    // get return url from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }
  get formValues() {
    return this.rForm.controls;
  }

  Login() {
    this.spinnerService.showSpinner();
    this.loginService
      .loginUser(this.formValues.email.value, this.formValues.password.value)
      .pipe(first())
      .subscribe(response => {
        if (response.UserId !== undefined) {
           this.router.navigate(['/dashboard']);
          this.spinnerService.hideSpinner();
        } else {
          this.error = response;
          this.spinnerService.hideSpinner();
        }
      });
  }


  closeModal() {
    this.closeModalAction.emit({
      close: true
    });
  }
}
