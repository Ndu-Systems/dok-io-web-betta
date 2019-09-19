import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LAST_INSERT_ID } from 'src/app/shared';
import { PatientSectionsEventEmitter, Patient } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService, LoginService } from 'src/app/services';

@Component({
  selector: 'app-patient-contact-information',
  templateUrl: './patient-contact-information.component.html',
  styleUrls: ['./patient-contact-information.component.scss']
})
export class PatientContactInformationComponent implements OnInit {
  @Output() patientSection: EventEmitter<
    PatientSectionsEventEmitter
  > = new EventEmitter();
  patientId;
  patient: Patient;
  user;
  rForm: FormGroup;
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
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authenticationService: LoginService,
  ) { }

  ngOnInit() {
    this.patientId = localStorage.getItem(LAST_INSERT_ID);
    this.patientService.getPatient(this.patientId).subscribe(response => {
      this.patient = response;
    });

    this.authenticationService.currentUser.subscribe(u => this.user = u);
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Cellphone: [null, Validators.required],
      AddressLine1: [null],
      Province: [null, Validators.required],
      City: [null, Validators.required],
      PostCode: [null, Validators.required],
      CreateUserId: [this.user.UserId],
      StatusId: [1]
    });
  }

  updatePatient(p: Patient) {
    this.patient.Email = p.Email;
    this.patient.Cellphone = p.Cellphone;
    this.patient.AddressLine1 = p.AddressLine1;
    this.patient.Province = p.Province;
    this.patient.City = p.City;
    this.patient.PostCode = p.PostCode;
    this.patient.CreateUserId = p.CreateUserId;
    this.patient.StatusId = p.StatusId;
    this.patientService.updatePatient(this.patient)
    .subscribe(response => {
      if (response.PatientId) {
        localStorage.setItem(LAST_INSERT_ID, response.PatientId);
        // change the section state of add a parent
        this.patientSection.emit({
          openPatientContactSection: false,
          openPatientSection: false,
          openAddMedicalAidSection: true,
          openAddEmergencyContactSection: false,
          closeAll: false
        });
      }
    });
  }

}
