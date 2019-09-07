import { element } from "protractor";
import {
  AddPrescriptionModel,
  Drug
} from "./../../../models/addprescription.model";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { getCurrentUser } from "src/app/shared";
import { PrescriptionService } from "src/app/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-prescription",
  templateUrl: "./add-prescription.component.html",
  styleUrls: ["./add-prescription.component.scss"]
})
export class AddPrescriptionComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<boolean> = new EventEmitter();
  @Input() patientId;
  UserId: string = getCurrentUser();

  results: any[];
  drugsList: any[];

  rForm: FormGroup;
  data: AddPrescriptionModel;
  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private router: Router
  ) {
    this.prescriptionService.getMedications().subscribe(r => {
      this.drugsList = r;
    });
  }
  ngOnInit() {
    this.rForm = this.fb.group({
      patientId: this.patientId,
      symptoms: "",
      diagnosis: "",
      boolPreasure: "",
      pulseRate: "",
      CreateUserId: this.UserId,
      ModifyUserId: this.UserId,
      StatusId: 1,
      drugs: this.fb.array([])
    });
    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }
  closeModal() {
    this.closeModalAction.emit(true);
  }

  get formDrugs() {
    return this.rForm.get("drugs") as FormArray;
  }
  addDrug() {
    const drug = this.fb.group({
      medicationId: "", // this will be name, then change it ti Id on send
      unit: "",
      dosage: ""
    });

    this.formDrugs.push(drug);

    // add new drug into db
  }
  deleteDrug(i) {
    this.formDrugs.removeAt(i);
  }
  proccessdata(data: AddPrescriptionModel) {
    let drugsListProccessed: Array<Drug> = [];
    let newDrugsList = [];

    if (data.drugs.length > 0) {
      data.drugs.forEach(element => {
        let drugId = this.drugsList.filter(
          x =>
            x.name.toLowerCase() == element.medicationId.toLocaleLowerCase() ||
            x.medicationId.toLowerCase() ==
              element.medicationId.toLocaleLowerCase()
        );

        if (drugId.length > 0) {
          element.medicationId = drugId[0].medicationId;
          drugsListProccessed.push(element);
        } else {
          let newDrug = {
            name: element.medicationId,
            description: element.medicationId,
            CreateUserId: this.UserId,
            StatusId: 1,
            dosage: element.dosage,
            unit: element.unit
          };
          newDrugsList.push(newDrug);
        }
      });
    }

    // inser new drugs firt and get new ids
    this.prescriptionService
      .addMedicationRange({ drugs: newDrugsList })
      .subscribe(r => {
        console.log("new drugs", r);
        let all_drugs = [...r, ...drugsListProccessed];
        console.log("all_drugs", all_drugs);
        // save prescription
        let data_copy = { ...data };
        data_copy.drugs = all_drugs;
        console.log("data_copy", data_copy);

        this.prescriptionService.addPrescription(data_copy).subscribe(r => {
          this.closeModalAction.emit(true);
          this.router.navigate([`/dashboard/view-prescription/${r}`])
        });
      });
  }
  search(event) {
    this.results = this.drugsList.map(x => x.name);
    this.results = this.results.filter(x =>
      x.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}
