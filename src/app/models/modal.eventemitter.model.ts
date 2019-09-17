export interface CloseModalEventEmmiter {
  openAddPatient: boolean;
  openAddMedicalAid: boolean;
  openAddEmengencyContact: boolean;
  closeAll: boolean;
  // optional for confirm box
  closeConfirm?: boolean;
  actionConfirmed?: boolean;


}

export interface ExitModalEventEmmiter {
  close: boolean;
};


export interface PatientSectionsEventEmitter {
  openAddPatient: boolean;
  openAddMedicalAid: boolean;
  openAddEmergencyContact: boolean;
  closeAll: boolean;
}
