import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models/modal.eventemitter.model';
import { Patient } from 'src/app/models/patient.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-print-prescription',
  templateUrl: './print-prescription.component.html',
  styleUrls: ['./print-prescription.component.scss']
})
export class PrintPrescriptionComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    ExitModalEventEmmiter> = new EventEmitter();

  @Input() drugs: any[];
  @Input() patient: Patient;
  @Input() prescription: any;

  user;
  currentUser;
  constructor(
    private authicateService: LoginService
  ) { }

  ngOnInit() {
    //get userid
    this.authicateService.currentUser.subscribe(u => (this.user = u));
    //get user details
    this.authicateService.getFullUserDetails(this.user.UserId).subscribe(r => {
      this.currentUser = r;
    });
  }

  closeModal() {
    this.closeModalAction.emit({
      close: true
    });
  }

  print() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // required configurations
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size of the pdf
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`prescription for ${this.patient.FirstName} ${this.patient.Surname} ${this.patient.IdNumber}.pdf`);//Generates pdf
    })
  }

}
