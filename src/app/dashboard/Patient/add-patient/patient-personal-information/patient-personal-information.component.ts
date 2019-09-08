import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PatientService, LoginService } from 'src/app/services';
import { LAST_INSERT_ID } from 'src/app/shared';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.scss']
})
export class PatientPersonalInformationComponent implements OnInit {
  rForm: FormGroup;
  Email: string;
  user;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authenticationService: LoginService,
    private routeTo: Router
  ) { }

  Age = 0;
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(u => this.user = u);
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      DOB: [null, Validators.required],
      IdNumber: [null, Validators.required],
      CreateUserId: [this.user.UserId],
      StatusId: [1],
      PracticeId: ['3766d2b9-6dd1-11e9-9e80-f48e38e878a3']
    });



  }


  addPatient(data) {
    this.patientService.addPatient(data).subscribe(response => {
      if (response.PatientId) {
        localStorage.setItem(LAST_INSERT_ID, response.PatientId); // to push on a model.
        this.routeTo.navigate(['dashboard/patients']);
      }
    });
  }
}
