export interface IVoucher {
    id: number;
    refNo: number;
    contractNo: number;
    renewalNo: number;
    amendmentNo: number;
    voucherType: VoucherType;
    isPaid: boolean;
    isRemoved: boolean;
    status: VoucherStatus;
    statusOriginal: VoucherStatus;
    statusCopy: VoucherStatus;
    statusNotification: VoucherStatus;
    lastName: string;
    firstName: string;
    taxNo: number;
    premiums: number;
    issueDate: Date;
    startDate: Date;
    endDate: Date;
    typeOfPayment: string;
    applicationNo: number;
    contractType: string;
    typeOfPaymentDescr: string;
}

export enum VoucherStatus {
    notUploaded = 0,
    cannotCreate = 1,
    cannotUpload = 2,
    uploaded = 3,
    printed = 5,
    declined = 9
}

export enum VoucherType {
    Contract,
    Renewal,
    Amendment,
    Installment
}
