import { AddPracticeComponent } from './Dok-practices/add-practice/add-practice.component';
import { AddStaffComponent } from './Dok-staff/add-staff/add-staff.component';
import { ArchivedPatientsComponent } from './Patient/archived-patients/archived-patients.component';
import { ConfirmBoxComponent } from './Patient/confirm-box/confirm-box.component';
import { UpdatePatientComponent } from './Patient/update-patient/update-patient.component';
import { AddNoteComponent } from './Patient/add-note/add-note.component';
import { AddPrescriptionComponent } from './prescription/add-prescription/add-prescription.component';
import { AddEmergencyContactComponent } from './Contact-Person/add-emergency-contact/add-emergency-contact.component';
import { AddMedicalAidComponent } from './Medical-aid/add-medical-aid/add-medical-aid.component';
import { PatientPrescriptionComponent } from './prescription/patient-prescription/patient-prescription.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PatientsComponent } from './Patient/patients/patients.component';
import { PatientComponent } from './Patient/patient-details/patient.component';
import { AddPatientComponent } from './Patient/add-patient/add-patient.component';
import { PrintPrescriptionComponent } from './prescription/print-prescription';
import { ViewPrescriptionComponent } from './prescription/view-prescription';
import { AccountOptionsComponent } from './account-options';
import { NotesComponent } from './Patient/notes/notes.component';
import { UpdateMedicalAidComponent } from './Medical-aid/update-medical-aid/update-medical-aid.component';
import { UpdateEmergencyContactComponent } from './Contact-Person/update-emergency-contact/update-emergency-contact.component';
import { StaffComponent } from './Dok-staff/staff/staff.component';
import { PracticesComponent } from './Dok-practices/practices/practices.component';
import { StatisticsComponent } from './statistics';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'archived', component: ArchivedPatientsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'practices', component: PracticesComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'patient/:id', component: PatientComponent },
      {
        path: 'patient-prescription/:id',
        component: PatientPrescriptionComponent
      },
      { path: 'view-prescription/:id', component: ViewPrescriptionComponent }
    ]
  }
];
export const declarations: Array<any> = [
  DashboardComponent,
  DashboardHomeComponent,
  PatientsComponent,
  PatientComponent,
  BreadCrumbComponent,
  AddPatientComponent,
  PatientPrescriptionComponent,
  AddMedicalAidComponent,
  AddEmergencyContactComponent,
  PrintPrescriptionComponent,
  ViewPrescriptionComponent,
  AddPrescriptionComponent,
  AccountOptionsComponent,
  NotesComponent,
  AddNoteComponent,
  UpdatePatientComponent,
  UpdateMedicalAidComponent,
  UpdateEmergencyContactComponent,
  ConfirmBoxComponent,
  ArchivedPatientsComponent,
  StaffComponent,
  AddStaffComponent,
  PracticesComponent,
  AddPracticeComponent,
  StatisticsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
