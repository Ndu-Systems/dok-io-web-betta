import { Component, OnInit } from '@angular/core';
import { getCurrentUser } from 'src/app/shared/config';
import { Patient } from 'src/app/models';
import { BreadCrumb } from '../../bread-crumb/bread-crumb.model';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services';

@Component({
  selector: 'app-archived-patients',
  templateUrl: './archived-patients.component.html',
  styleUrls: ['./archived-patients.component.scss']
})
export class ArchivedPatientsComponent implements OnInit {

  UserId: string = getCurrentUser();
  searchText: any;
  showUpdatePopup: boolean;
  openUpdatePatient: boolean;
  openUpdateMedicalAid: boolean;
  openUpdateEmengencyContact: boolean;
  patient: Patient;
  closeModal;
  actionString:string='John doe Is about to be archived';

  p: number = 1;
  items: Array<BreadCrumb> = [
    {
      name: "ACTIVE PATIENTS",
      url: "/dashboard",
      active: false
    },
    // {
    //   name: "INCOMPLETE PATIENTS",
    //   url: "/dashboard",
    //   active: false
    // },
    {
      name: " ARCHIVED PATIENTS",
      url: "/dashboard/archived",
      active: true
    }
  ];

  patients$: Observable<Array<any>> = this.patientService.getArchived();
  showConfirm: boolean;
  constructor(
    private patientService: PatientService
  ) {}

  ngOnInit() {}
}
