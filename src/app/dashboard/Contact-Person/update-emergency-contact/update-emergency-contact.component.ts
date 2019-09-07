import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, SELECT_PATIENT } from "src/app/shared";
import { EmergencyContactService } from "src/app/services/emergency-contact.service";
import { EmergencyContact } from "src/app/models/emegency.contact";

@Component({
  selector: "app-update-emergency-contact",
  templateUrl: "./update-emergency-contact.component.html",
  styleUrls: ["./update-emergency-contact.component.scss"]
})
export class UpdateEmergencyContactComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  rForm: FormGroup;
  UserId: string = getCurrentUser();
  PatientId: string;
  contactInfo: EmergencyContact;

  constructor(
    private fb: FormBuilder,
    private emergencyContactService: EmergencyContactService,
    private messageService: MessageService,
  ) {
    this.initFormData();
    this.formInit();
  }

  ngOnInit() {
    this.PatientId = localStorage.getItem(SELECT_PATIENT);
    this.emergencyContactService
      .getPatientEmegencyContatct(this.PatientId)
      .subscribe(r => {
        console.log("Medicat iad info", r);
        if (r.length == 0) {
          //create new medical aid
          this.createMedicalAid();
        } else {
          this.contactInfo = r[0];
        }
        // load the patient medical iad
        this.formInit();
      });
  }

  formInit() {
    this.rForm = this.fb.group({
      ContactPersonId: [this.contactInfo.ContactPersonId, Validators.required],
      PatientId: [localStorage.getItem(SELECT_PATIENT), Validators.required],
      Name: [this.contactInfo.Name, Validators.required],
      Relationship: [this.contactInfo.Relationship, Validators.required],
      CellNumber: [this.contactInfo.CellNumber, Validators.required],
      ModifyUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
      if (!data.HasMedicalAid) {
      }
    });
  }

  createMedicalAid(): any {
    this.initFormData();
    this.formInit();
    return true;
  }
  closeModal(): void {
    this.closeModalAction.emit({
      closeAll: true,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: false
    });
  }

  openPrev() {
    this.closeModalAction.emit({
      closeAll: false,
      openAddEmengencyContact: false,
      openAddMedicalAid: true,
      openAddPatient: false
    });
  }
  openFirst() {
    this.closeModalAction.emit({
      closeAll: false,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: true
    });
  }
  updateContact(data) {
    console.log(data);
    this.emergencyContactService
      .updateEmergencyContact(data)
      .subscribe(response => {
        if (response) {
          this.popMessage('success','Transiction saved',`Emergency cantatc  details updated!`);
          this.closeModal();
        } else {
          alert(`Error: ${response}`);
        }
      });
  }

  initFormData() {
    this.contactInfo = {
      ContactPersonId: "00000",
      PatientId: this.PatientId,
      Name: "",
      Relationship: "",
      CellNumber: "",
      CreateUserId: this.UserId,
      ModifyUserId: this.UserId,
      StatusId: "1"
    };
    console.log("init contactInfo", this.contactInfo);
  }
  popMessage(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
    // this.popMessage('success','Transiction saved',`Emergency cantatc  details updated!`);
    // this.popMessage('success','Transiction saved',`${this.patient.FirstName } details updated!`);
    //<p-toast></p-toast>
  }
}
