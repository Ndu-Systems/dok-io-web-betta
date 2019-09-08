import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.scss']
})
export class PatientPersonalInformationComponent implements OnInit {
  rForm: FormGroup;
  Email: string;
  constructor(
    private fb: FormBuilder,
  ) { }

  Age = 100;
  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      DOB: [null, Validators.required],
      IdNumber: [null, Validators.required]
    });
  }

}
