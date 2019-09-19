import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PatientService, LoginService } from 'src/app/services';
import { LAST_INSERT_ID } from 'src/app/shared';
import { PatientSectionsEventEmitter } from 'src/app/models';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.scss']
})
export class PatientPersonalInformationComponent implements OnInit {
  @Output() patientSection: EventEmitter<
    PatientSectionsEventEmitter
  > = new EventEmitter();
  Age: number;
  rForm: FormGroup;
  Email: string;
  user;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authenticationService: LoginService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(u => this.user = u);
    this.rForm = this.fb.group({
      Title: [null, Validators.required],
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      DOB: [null, Validators.required],
      IdNumber: [null, Validators.required],
      CreateUserId: [this.user.UserId],
      StatusId: [1],
      PracticeId: ['3766d2b9-6dd1-11e9-9e80-f48e38e878a3']
    });
    this.rForm.valueChanges.subscribe(data => {
      if (data.DOB) { this.calculateAge(data.DOB); }
    });
  }


  addPatient(data) {
    this.patientService.addPatient(data).subscribe(response => {
      if (response.PatientId) {
        localStorage.setItem(LAST_INSERT_ID, response.PatientId);
        // change the section state of add a parent
        this.patientSection.emit({
          openPatientContactSection: true,
          openPatientSection: false,
          openAddMedicalAidSection: false,
          openAddEmergencyContactSection: false,
          closeAll: false
        });
      }
    });
  }

  calculateAge(date) {
    const ageDifMs = Date.now() - new Date(date).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.Age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
