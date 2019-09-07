export interface Drug {
    medicationId: string;
    unit: string;
    dosage: string;
}

export interface AddPrescriptionModel {
    patientId: string;
    symptoms: string;
    diagnosis: string;
    boolPreasure: string;
    pulseRate: string;
    CreateUserId: string;
    ModifyUserId: string;
    StatusId: string;
    drugs: Drug[];
}
