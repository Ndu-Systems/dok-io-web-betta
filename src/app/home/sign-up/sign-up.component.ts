import { WEB_HOST, VERIFICATIONLINK } from './../../shared/config';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExitModalEventEmmiter } from 'src/app/models';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  rForm: FormGroup;
  @Output() closeModalAction: EventEmitter<
    ExitModalEventEmmiter
  > = new EventEmitter();
  email = 'doc@mail.com';
  password = 'pass';
  error;
  passwordMisMatch: string;
  showVerificationEmailSent: boolean;
  progress = 'Email sent';

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private emailService: EmailService,
    private router: Router
  ) {
    this.rForm = fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      Title: [null, Validators.required],
      Gender: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      IdNumber: [null, Validators.required],
      CreateUserId: ['SYS', Validators.required],
      ModifyUserId: ['SYS', Validators.required],
      Email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      Password: [null, Validators.required],
      PasswordConfirm: [null, Validators.required],
      StatusId: [4, Validators.required]
    });
  }

  ngOnInit() { }
  get formValues() {
    return this.rForm.controls;
  }
  mailSent(v) {
    this.showVerificationEmailSent = v;
  }

  SignUp(data) {
    this.passwordMisMatch = undefined;
    console.log(data);
    if (data.Password !== data.PasswordConfirm) {
      this.passwordMisMatch = 'Passwords must match';
      return false;
    }
    this.signUpService.signUp(data).subscribe(response => {
      if (response.UserId) {
        const link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response.UserId}`;
        this.verifyAcc(response.FirstName, response.Email, link);
      }
    });
  }

  closeModal() {
    this.closeModalAction.emit({
      close: true
    });
  }
  verifyAcc(name, email, link) {
    const data = {
      name: name, email: email, link: link
    };
    this.emailService.sendVerifyAcc(data).subscribe(r => {
      // alert(JSON.stringify(r))
      this.showVerificationEmailSent = true;
      this.progress = `To ensure that your email account is valid, we have sent you an email to
      ${email} to  verify your account,  please check your mailbox`;
    });
  }
}
