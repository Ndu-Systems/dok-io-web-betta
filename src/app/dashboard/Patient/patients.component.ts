import { User, CardModel } from 'src/app/models';
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
  model: CardModel;
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
    // Check if the user is staff
    this.authicateService.currentUser.subscribe(u => (this.user = u));
    this.patientService.getPatients(parentuserid).subscribe(r => {
      this.patients = r.patients;
      console.log(this.patients);
      this.model.items = this.patients;
      console.log(this.model.items);
     });
    this.model = new CardModel();
    this.model.type = 'patients';

  }

  showEdit(patient: any) {
    this.patient = patient;
    this.showUpdatePopup = this.openUpdatePatient = true;
    this.patient.showMobilePatientOptions = false;
  }

}
