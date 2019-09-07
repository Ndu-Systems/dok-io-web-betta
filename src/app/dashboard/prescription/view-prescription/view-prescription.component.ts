import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from '../../bread-crumb/bread-crumb.model';
import { PrescriptionService, PatientService } from 'src/app/services';
import { Patient } from 'src/app/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ExitModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.scss']
})
export class ViewPrescriptionComponent implements OnInit {

  items: Array<BreadCrumb> = [];
  rForm: FormGroup;
  patient: Patient;
  patientId: string;
  prescriptionId: string;
  prescription: any;
  drugs: any[];
  showModal: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private prescriptionService: PrescriptionService,
    private patientService: PatientService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.prescriptionId = r['id'];
    });
   this.getPrescription();
  }

  ngOnInit() {
  }

  getPrescription(){
    this.prescriptionService.getPrescriptionById(this.prescriptionId)
      .subscribe(response => {
        if (response){
            this.prescription = response;
            this.patientId = this.prescription[0].patientId;
            this.drugs = this.prescription[0].drugs;
            this.getPatientDetails();
            this.getItems();
        }
      });
  }

  getPatientDetails() {
    this.patientService.getPatient(this.patientId)
        .subscribe(response => {
          this.patient = response;
        });
  }

  getItems() {
    this.items = [
      {
        name: 'PERSONAL DETAILS',
        url: `/dashboard/patient/${this.patientId}`,
        active: false
      },
      {
        name: 'PRESCRIPTIONS',
        url: `/dashboard/patient-prescription/${this.patientId}`,
        active: true
      },
      // {
      //   name: ' APPOINTMENTS',
      //   url: '/dashboard',
      //   active: false
      // }
    ];
  }

  showPrintModal() {
    this.showModal = true;
  }

  closeModal(event: ExitModalEventEmmiter){
    if (event.close) {
        this.showModal = false;
    }
  }


}
