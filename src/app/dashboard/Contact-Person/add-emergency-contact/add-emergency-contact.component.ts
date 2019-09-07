import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloseModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser, LAST_INSERT_ID } from 'src/app/shared';
import { EmergencyContactService } from 'src/app/services/emergency-contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emergency-contact',
  templateUrl: './add-emergency-contact.component.html',
  styleUrls: ['./add-emergency-contact.component.scss']
})
export class AddEmergencyContactComponent implements OnInit {
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
Name: string;
Relationship: string;
CellNumber: string;
CreateUserId: string;
StatusId: number;
constructor(private fb: FormBuilder, private emergencyContactService: EmergencyContactService, private router:Router) {
  this.rForm = fb.group({
    PatientId: [localStorage.getItem(LAST_INSERT_ID), Validators.required],
    Name: [null, Validators.required],
    Relationship: [null, Validators.required],
    CellNumber: [null, Validators.required],
    CreateUserId: [this.UserId, Validators.required],
    StatusId: [1, Validators.required],
  });

  this.rForm.valueChanges.subscribe(data => {
    console.log(data);
  });
}

ngOnInit() {
  this.PatientId = localStorage.getItem(LAST_INSERT_ID);
}
closeModal() {
  this.closeModalAction.emit({
    closeAll: true,
    openAddEmengencyContact: false,
    openAddMedicalAid: false,
    openAddPatient: false
  });
}
addcontact(data) {
  this.emergencyContactService.addEmergencyContact(data).subscribe(response => {    
    if (response) {
      this.closeModalAction.emit({
        closeAll: true,
        openAddEmengencyContact: false,
        openAddMedicalAid: false,
        openAddPatient: false
      });
      this.router.navigate([`/dashboard/patient/${this.PatientId}`])


    } else {
      alert(`Error: ${response}`);
    }
  });
}

goBanckOnce(){
  this.closeModalAction.emit({
    closeAll: false,
    openAddEmengencyContact: false,
    openAddMedicalAid: true,
    openAddPatient: false
  });
}
}
