import { LAST_INSERT_ID } from "src/app/shared";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models/modal.eventemitter.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser } from "src/app/shared";
import { MedicalaidService } from "src/app/services/medicalaid.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-add-medical-aid",
  templateUrl: "./add-medical-aid.component.html",
  styleUrls: ["./add-medical-aid.component.scss"]
})
export class AddMedicalAidComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;

  //validation
  message: string = "";

  /*
Form ends here
*/
  UserId: string = getCurrentUser();

  PatientId: string;
  MedicalaidName: string;
  MedicalaidType: string;
  MemberShipNumber: string;
  PrimaryMember: string;
  PrimaryMemberId: string;
  CreateUserId: string;
  StatusId: number;
  constructor(
    private fb: FormBuilder,
    private medicalaidService: MedicalaidService,
    private messageService: MessageService
  ) {
    this.rForm = fb.group({
      PatientId: [localStorage.getItem(LAST_INSERT_ID), Validators.required],
      HasMedicalAid: [true, Validators.required],
      MedicalaidName: [null, Validators.required],
      MedicalaidType: [null, Validators.required],
      MemberShipNumber: [null, Validators.required],
      PrimaryMember: [null, Validators.required],
      PrimaryMemberId: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
      if (!data.HasMedicalAid) {
        this.openNextScreen();
      }
    });
  }

  ngOnInit() {}
  closeModal() {
    this.closeModalAction.emit({
      closeAll: true,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: false
    });
  }
  addmedicalaid(data) {
    this.medicalaidService.addMedicalaid(data).subscribe(response => {
      if (response) {
        this.popMessage('success','Transiction saved',`Medical; Aid created successfuly `);
        this.openNextScreen();
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
  openNextScreen() {
    this.closeModalAction.emit({
      closeAll: false,
      openAddEmengencyContact: true,
      openAddMedicalAid: false,
      openAddPatient: false
    });
  }
  popMessage(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
    // this.popMessage('success','Transiction saved',`${this.patient.FirstName } details updated!`);
    //<p-toast></p-toast>
  }
}
