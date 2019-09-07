import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser } from "src/app/shared";
import { PatientService, LoginService, SignUpService } from "src/app/services";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"]
})
export class AddStaffComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<boolean> = new EventEmitter();
  @Input() PatientId;
  @Input() Name;
  rForm: FormGroup;

  error: string;
  prescriptionGiven: string;
  UserId: string = getCurrentUser();
  password: string = "Password01";

  constructor(
    private fb: FormBuilder,
    private authitacateService: LoginService,
    private signUpService: SignUpService,
  ) {}

  ngOnInit() {
    this.UserId = this.authitacateService.getUser.UserId;
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      Title: [null, Validators.required],
      Gender: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      IdNumber: [null, Validators.required],
      CreateUserId: [this.UserId, Validators.required],
      Email: [null, Validators.required],
      Password: [this.password, Validators.required],
      StatusId: [4, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }
  closeModal() {
    this.closeModalAction.emit(false);
  }

  addStaff(data) {

    this.signUpService.addStaff(data).subscribe(response => {
      if (response.UserId) {
        this.closeModalAction.emit(false);
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
