import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PatientSectionsEventEmitter } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicalaidService } from 'src/app/services';
import { getCurrentUser, LAST_INSERT_ID } from 'src/app/shared';

@Component({
  selector: 'app-patient-medical-aid-information',
  templateUrl: './patient-medical-aid-information.component.html',
  styleUrls: ['./patient-medical-aid-information.component.scss']
})
export class PatientMedicalAidInformationComponent implements OnInit {
  @Output() patientSection: EventEmitter<
    PatientSectionsEventEmitter
  > = new EventEmitter();
  rForm: FormGroup;
  UserId: string = getCurrentUser();
  constructor(
    private fb: FormBuilder,
    private medicalaidService: MedicalaidService,
  ) { }

  ngOnInit(
  ) {
    this.rForm = this.fb.group({
      PatientId: [localStorage.getItem(LAST_INSERT_ID), Validators.required],
      HasMedicalAid: [null],
      MedicalaidName: [null, Validators.required],
      MedicalaidType: [null, Validators.required],
      MemberShipNumber: [null, Validators.required],
      PrimaryMember: [null, Validators.required],
      PrimaryMemberId: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required]
    });
    this.rForm.valueChanges.subscribe(data => {
      if (!data.HasMedicalAid) {
        this.transitionState();
      }
    });
  }

  addMedicalAid(data) {
    this.medicalaidService.addMedicalaid(data).subscribe(response => {
      if (response) {
        this.transitionState();
      }
    });
  }

  transitionState() {
    this.patientSection.emit({
      openPatientContactSection: false,
      openPatientSection: false,
      openAddMedicalAidSection: false,
      openAddEmergencyContactSection: true,
      closeAll: false
    });
  }

}
