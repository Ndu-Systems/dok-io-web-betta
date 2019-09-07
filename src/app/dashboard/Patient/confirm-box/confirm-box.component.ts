import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CloseModalEventEmmiter } from 'src/app/models';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
  CloseModalEventEmmiter
> = new EventEmitter();

@Input() actionString;
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.closeModalAction.emit({
      closeAll: false,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: false,
      closeConfirm:true,
      actionConfirmed:false
    });
  }
  confirm() {
    this.closeModalAction.emit({
      closeAll: false,
      openAddEmengencyContact: false,
      openAddMedicalAid: false,
      openAddPatient: false,
      actionConfirmed:true
    });
  }

}
