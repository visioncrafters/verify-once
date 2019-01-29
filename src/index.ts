import axios, { AxiosInstance } from "axios";
import { verify } from "jsonwebtoken";
import {
  CountryCode,
  DocumentVerificationDocumentStatus,
  DocumentVerificationSource,
  DocumentVerificationTransactionStatus,
  DocumentVerificationType,
  IdentityInvalidReason,
  IdentityVerificationStatus,
  IdScanSource,
  IdScanStatus,
  IdSubType,
  IdType,
  RejectDetailsCode,
  RejectDetailsDescription,
  RejectReasonCode,
  RejectReasonDescription,
  Similarity
} from "jumio";

// enumeration of possible callback statuses
export enum VerificationStatus {
  UNINITIATED = "UNINITIATED",
  INITIATED = "INITIATED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED"
}

// callback identity verification info
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
  idDob: string | null; // TODO: convert to Date?
  idExpiry: string | null; // TODO: convert to Date?
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
  transactionDate: string | null; // TODO: convert to Date?
  callbackDate: string | null; // TODO: convert to Date?
  createdDate: string | null; // TODO: convert to Date?
  updatedDate: string | null; // TODO: convert to Date?
  imageUrlFront: string | null;
  imageUrlBack: string | null;
  imageUrlFace: string | null;
}

// callback identity verification info
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
  transactionDate: string | null; // TODO: convert to Date?
  callbackDate: string | null; // TODO: convert to Date?
  createdDate: string | null; // TODO: convert to Date?
  updatedDate: string | null; // TODO: convert to Date?
  imageUrls: string[];
  originalDocumentUrl: string | null;
}

// callback payload
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

// initiation request response data
export interface InitiateResponse {
  transactionId: string;
  url: string;
}

export interface VerifyOnceOptions {
  username: string;
  password: string;
  baseUrl?: string;
}

export class VerifyOnce {
  private readonly api: AxiosInstance;
  private readonly options: Required<VerifyOnceOptions>;

  constructor(options: VerifyOnceOptions) {
    this.options = {
      baseUrl: "https://verifyonce.com/api/verify",
      ...options
    };

    this.api = axios.create({
      baseURL: this.options.baseUrl,
      auth: {
        username: this.options.username,
        password: this.options.password
      }
    });
  }

  async initiate(): Promise<InitiateResponse> {
    const response = await this.api.post<InitiateResponse>("/initiate");

    return response.data;
  }

  verifyCallbackInfo(body: string) {
    return verify(body, this.options.password) as CallbackInfo;
  }
}
