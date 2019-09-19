export interface CloseModalEventEmmiter {
  openAddPatient: boolean;
  openAddMedicalAid: boolean;
  openAddEmengencyContact: boolean;
  closeAll: boolean;
  closeConfirm?: boolean;
  actionConfirmed?: boolean;
}

export interface ExitModalEventEmmiter {
  close: boolean;
};


export interface PatientSectionsEventEmitter {
  openPatientSection: boolean;
  openPatientContactSection: boolean;
  openAddMedicalAidSection: boolean;
  openAddEmergencyContactSection: boolean;
  closeAll: boolean;
}
