import { Router } from '@angular/router';
import { CloseModalEventEmmiter, PatientSectionsEventEmitter } from './../../../models/modal.eventemitter.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //l-f
import { PatientService, LoginService } from 'src/app/services';
import { LAST_INSERT_ID, getCurrentUser } from 'src/app/shared';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();
  showPersonal = true;
  showMedical = false;
  showContact = false;
  showEmergencyContact = false;
  user;
  provinces: Array<string> = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape'
  ];

  /*
Form begin here
*/
  rForm: FormGroup;

  FirstName: string;
  Surname: string;
  IdNumber: string;
  DOB: string;
  Gender: string;
  Email: string;
  Cellphone: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  City: string;
  PostCode: string;
  CreateUserId: string;
  ModifyUserId: string;
  StatusId: number;
  Province: number;
  // validation
  message: string = '';

  /*
Form ends here
*/
  Age: number;
  UserId: string = getCurrentUser();

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private routeTo: Router,
    private authenticationService: LoginService) {
    this.authenticationService.currentUser.subscribe(u => this.user = u);
    this.rForm = fb.group({
      Title: [null, Validators.required],
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      IdNumber: [null, Validators.required],
      DOB: [null, Validators.required],
      Gender: [null, Validators.required],
      Email: [null],
      Cellphone: [null, Validators.required],
      AddressLine1: [null],
      City: [null],
      PostCode: [null],
      CreateUserId: [this.user.UserId],
      StatusId: [1],
      Province: [null],
      PracticeId: ['3766d2b9-6dd1-11e9-9e80-f48e38e878a3'] // TODO Select from Practice field?
    });
  }

  ngOnInit() { }

  updateSectionState(event: PatientSectionsEventEmitter) {
    this.showPersonal = event.openPatientSection;
    this.showMedical = event.openAddMedicalAidSection;
    this.showContact = event.openPatientContactSection;
    this.showEmergencyContact = event.openAddEmergencyContactSection;
    if (event.closeAll) {
      this.routeTo.navigate(['dashboard/patients']);
    }
  }
}
