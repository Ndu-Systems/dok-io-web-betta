import { User } from 'src/app/models';
import { Patient } from '../../models/patient.model';
import { Component, OnInit } from '@angular/core';
import { PatientService, QueeService, LoginService } from 'src/app/services';
import { Observable } from 'rxjs';
import { BreadCrumb } from '../bread-crumb/bread-crumb.model';
import { getCurrentUser, USER_ROLES_STAFF } from 'src/app/shared';
import { CloseModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  UserId: string = getCurrentUser();
  searchText: any;
  showUpdatePopup: boolean;
  openUpdatePatient: boolean;
  openUpdateMedicalAid: boolean;
  openUpdateEmengencyContact: boolean;
  patients: any[];
  patient: any;
  actionString: string = 'John doe Is about to be archived';
  user: User;
  p: number = 1;
  items: Array<BreadCrumb> = [
    {
      name: 'ACTIVE PATIENTS',
      url: '/dashboard',
      active: true
    },
    // {
    //   name: "INCOMPLETE PATIENTS",
    //   url: "/dashboard",
    //   active: false
    // },
    {
      name: ' ARCHIVED PATIENTS',
      url: '/dashboard/archived',
      active: false
    }
  ];

  showConfirm: boolean;
  prevCustomer: any = {};
  constructor(
    private patientService: PatientService,
    private queeService: QueeService,
    private messageService: MessageService,
    private authicateService: LoginService
  ) { }

  ngOnInit() {
    this.authicateService.currentUser.subscribe(u => (this.user = u));
    let parentuserid = this.user.UserId;
    if (this.user.Role == USER_ROLES_STAFF) {
      parentuserid = this.user.ParentId;
    }
    //Check if the user is staff
    this.authicateService.currentUser.subscribe(u => (this.user = u));
    this.patientService.getPatients(parentuserid).subscribe(r => {
      this.patients = r;
    });
  }
  quue(patient: Patient) {
    let data = {
      PatientName: `${patient.FirstName} ${patient.Surname}`,
      PatientId: patient.PatientId,
      Status: 1,
      CreateUserId: this.UserId
    };
    this.queeService.addQuee(data).subscribe(r => {
      if (!isNaN(r)) {
        this.popMessage('success', 'Added to quee', `Your ticket number: ${r}`);
      } else {
        this.popMessage('warn', 'Sorry...', `${r}`);
      }
    });
  }
  showEdit(patient: any) {
    this.patient = patient;
    this.showUpdatePopup = this.openUpdatePatient = true;
    this.patient.showMobilePatientOptions = false;
  }
  closeModal(e: CloseModalEventEmmiter) {
    console.log(e);
    this.closeAll();

    if (e.closeAll) {
      this.showUpdatePopup = false;
      this.patientService.getPatients(this.UserId).subscribe(r => {
        this.patients = r;
      });
    } else if (e.openAddMedicalAid) {
      this.openUpdatePatient = false;
      this.openUpdateMedicalAid = true;
    } else if (e.openAddEmengencyContact) {
      this.openUpdatePatient = false;
      this.openUpdateMedicalAid = false;
      this.openUpdateEmengencyContact = true;
    } else if (e.openAddPatient) {
      this.openUpdatePatient = true;
      this.openUpdateMedicalAid = false;
      this.openUpdateEmengencyContact = false;
    } else if (e.closeConfirm) {
      this.showConfirm = false;
    } else if (e.actionConfirmed) {
      this.showConfirm = false;
      this.archive();
    }
  }
  closeAll() {
    this.openUpdatePatient = false;
    this.openUpdateMedicalAid = false;
    this.openUpdateEmengencyContact = false;
    this.showConfirm = false;
  }

  confirmArchive(patient: Patient) {
    this.showConfirm = true;
    this.actionString = `${patient.FirstName} ${
      patient.Surname
      } Is about to be archived`;
    this.patient = patient;
    this.patient.showMobilePatientOptions = false;
  }
  archive() {
    this.patient.StatusId = 2;
    this.patient.CreateUserId = this.UserId;
    this.patientService.updatePatient(this.patient).subscribe(r => {
      // this.patients$ = this.patientService.getPatients();
      this.patientService.getPatients(this.UserId).subscribe(r => {
        this.patients = r;
      });

      // alert(`${this.patient.FirstName } archived!`)
      this.popMessage(
        'warn',
        'Transiction saved',
        `${this.patient.FirstName} archived!`
      );
    });
  }
  popMessage(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }
  toggleShowMobilePatientOptions(data, val) {
    this.prevCustomer.showMobilePatientOptions = false;
    data.showMobilePatientOptions = val;
    this.prevCustomer = data;
    this.patient = data;
  }

  viewPatient() {
    alert('news read');
  }
}
