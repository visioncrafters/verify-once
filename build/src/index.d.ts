import { CountryCode, DocumentVerificationDocumentStatus, DocumentVerificationSource, DocumentVerificationTransactionStatus, DocumentVerificationType, IdentityInvalidReason, IdentityVerificationStatus, IdScanSource, IdScanStatus, IdSubType, IdType, RejectDetailsCode, RejectDetailsDescription, RejectReasonCode, RejectReasonDescription, Similarity } from "jumio";
export declare enum VerificationStatus {
    UNINITIATED = "UNINITIATED",
    INITIATED = "INITIATED",
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    FAILED = "FAILED"
}
export interface IdentityCallbackInfo {
    id: string;
    userId: string;
    transactionId: string;
    jumioId: string | null;
    status: VerificationStatus;
    verificationUrl: string | null;
    verificationStatus: IdentityVerificationStatus | null;
    idScanStatus: IdScanStatus | null;
    idScanSource: IdScanSource | null;
    idType: IdType | null;
    idSubtype: IdSubType | null;
    idNumber: string | null;
    idCountry: string | null;
    idFirstName: string | "N/A" | null;
    idLastName: string | "N/A" | null;
    idDob: string | null;
    idExpiry: string | null;
    identityVerificationValidity: boolean | null;
    identityVerificationSimilarity: Similarity | null;
    identityVerificationReason: IdentityInvalidReason | null;
    personalNumber: string | null;
    rejectReasonCode: RejectReasonCode | null;
    rejectReasonDescription: RejectReasonDescription | null;
    rejectReasonDetailsCode: RejectDetailsCode | null;
    rejectReasonDetailsDescription: RejectDetailsDescription | null;
    idScanImage: string | null;
    idScanImageBackside: string | null;
    idScanImageFace: string | null;
    callbackJSON: string | null;
    transactionDate: string | null;
    callbackDate: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    imageUrlFront: string | null;
    imageUrlBack: string | null;
    imageUrlFace: string | null;
}
export interface DocumentCallbackInfo {
    id: string;
    userId: string;
    transactionId: string;
    jumioId: string | null;
    documentType: DocumentVerificationType;
    countryCode: CountryCode;
    status: VerificationStatus;
    transactionStatus: DocumentVerificationTransactionStatus | null;
    documentStatus: DocumentVerificationDocumentStatus | null;
    verificationUrl: string | null;
    source: DocumentVerificationSource | null;
    name: string | null;
    address: string | null;
    images: string | null;
    originalDocument: string | null;
    callbackJSON: string | null;
    transactionDate: string | null;
    callbackDate: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    imageUrls: string[];
    originalDocumentUrl: string | null;
}
export interface CallbackInfo {
    transaction: {
        id: string;
        integratorId: string;
        userId: string;
        createdDate: string;
        updatedDate: string;
    };
    user: {
        id: string;
        email: string;
        role: string;
        scopes: string[];
        createdDate: string;
        updatedDate: string;
    };
    identityVerification: IdentityCallbackInfo | null;
    documentVerification: DocumentCallbackInfo | null;
}
export interface InitiateResponse {
    transactionId: string;
    url: string;
}
export interface VerifyOnceOptions {
    username: string;
    password: string;
    baseUrl?: string;
}
export declare class VerifyOnce {
    private readonly api;
    private readonly options;
    constructor(options: VerifyOnceOptions);
    initiate(): Promise<InitiateResponse>;
    verifyCallbackInfo(body: string): CallbackInfo;
}
