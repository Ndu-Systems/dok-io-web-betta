import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PatientSectionsEventEmitter } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmergencyContactService } from 'src/app/services';
import { LAST_INSERT_ID, getCurrentUser } from 'src/app/shared';

@Component({
  selector: 'app-patient-emergency-contact-information',
  templateUrl: './patient-emergency-contact-information.component.html',
  styleUrls: ['./patient-emergency-contact-information.component.scss']
})
export class PatientEmergencyContactInformationComponent implements OnInit {
  @Output() patientSection: EventEmitter<
    PatientSectionsEventEmitter
  > = new EventEmitter();
  rForm: FormGroup;
  UserId: string = getCurrentUser();
  constructor(
    private fb: FormBuilder,
    private emergencyContactService: EmergencyContactService,
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      PatientId: [localStorage.getItem(LAST_INSERT_ID), Validators.required],
      Name: [null, Validators.required],
      Relationship: [null, Validators.required],
      CellNumber: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required],
    });
  }

  addEmergencyContact(data) {
    this.emergencyContactService.addEmergencyContact(data).subscribe(response => {
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
      openAddEmergencyContactSection: false,
      closeAll: true
    });
  }

}
