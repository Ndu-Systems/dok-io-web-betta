import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getCurrentUser } from 'src/app/shared';
import { LoginService, PracticesService } from 'src/app/services';

@Component({
  selector: 'app-add-practice',
  templateUrl: './add-practice.component.html',
  styleUrls: ['./add-practice.component.scss']
})
export class AddPracticeComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<boolean> = new EventEmitter();
  @Input() PatientId;
  @Input() Name;
  rForm: FormGroup;

  prescriptionGiven: string;
  UserId = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authenticateService: LoginService,
    private practicesService: PracticesService,
  ) { }

  ngOnInit() {
    this.UserId = this.authenticateService.getUser.UserId;
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      Address: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      StatusId: [1, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }
  closeModal() {
    this.closeModalAction.emit(false);
  }

  addPractice(data) {

    this.practicesService.addPractice(data).subscribe(response => {
      if (response.PracticeId) {
        this.closeModalAction.emit(false);
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
