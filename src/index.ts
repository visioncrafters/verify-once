import axios, { AxiosInstance } from "axios";
import { verify } from "jsonwebtoken";

// possible verification statuses
export enum VerificationStatus {
  UNINITIATED = "UNINITIATED",
  INITIATED = "INITIATED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  LOCKED = "LOCKED",
  DOCUMENT_EXPIRING_VERIFIED = "DOCUMENT_EXPIRING_VERIFIED",
  DOCUMENT_EXPIRED_REJECTED = "DOCUMENT_EXPIRED_REJECTED",
  VERIFICATION_EXPIRING_VERIFIED = "VERIFICATION_EXPIRING_VERIFIED",
  VERIFICATION_EXPIRED_REJECTED = "VERIFICATION_EXPIRED_REJECTED"
}

// identity document types
export enum IdentityIdType {
  PASSPORT = "PASSPORT",
  DRIVING_LICENCE = "DRIVING_LICENCE",
  ID_CARD = "ID_CARD",
  VISA = "VISA",
  UK_BIOMETRIC_RESIDENCE_PERMIT = "UK_BIOMETRIC_RESIDENCE_PERMIT",
  TAX_ID = "TAX_ID",
  VOTER_ID = "VOTER_ID",
  RESIDENCE_PERMIT = "RESIDENCE_PERMIT",
  WORK_PERMIT = "WORK_PERMIT",
  BANK_STATEMENT = "BANK_STATEMENT",
  UNKNOWN = "UNKNOWN",
  BIRTH_CERTIFICATE = "BIRTH_CERTIFICATE",
  NATIONAL_INSURANCE_CARD = "NATIONAL_INSURANCE_CARD",
  GOVERNMENT_LETTER = "GOVERNMENT_LETTER",
  P45_P60 = "P45_P60",
  PAYSLIP = "PAYSLIP",
  BANK_BUILDING_SOCIETY_STATEMENT = "BANK_BUILDING_SOCIETY_STATEMENT",
  UTILITY_BILL_ELECTRIC = "UTILITY_BILL_ELECTRIC",
  UTILITY_BILL_GAS = "UTILITY_BILL_GAS",
  UTILITY_BILL_OTHER = "UTILITY_BILL_OTHER",
  NON_UK_DRIVING_LICENCE = "NON_UK_DRIVING_LICENCE",
  UK_DRIVING_LICENCE = "UK_DRIVING_LICENCE",
  MOTORCYCLE_INSURANCE = "MOTORCYCLE_INSURANCE",
  CBT = "CBT",
  MARRIAGE_CERTIFICATE = "MARRIAGE_CERTIFICATE",
  NATURALISATION_CERTIFICATE = "NATURALISATION_CERTIFICATE",
  CHARACTER_REFERENCE = "CHARACTER_REFERENCE",
  STATEMENT_FACT = "STATEMENT_FACT",
  EDUCATIONAL_STATEMENT = "EDUCATIONAL_STATEMENT",
  PASSPORT_CARD = "PASSPORT_CARD",
  CERTIFICATE_OF_NATURALISATION = "CERTIFICATE_OF_NATURALISATION",
  IMMIGRATION_STATUS_DOCUMENT = "IMMIGRATION_STATUS_DOCUMENT",
  HOME_OFFICE_LETTER = "HOME_OFFICE_LETTER",
  UTILITY_BILL = "UTILITY_BILL",
  COUNCIL_TAX = "COUNCIL_TAX",
  BENEFIT_LETTERS = "BENEFIT_LETTERS",
  CREDIT_CARD_STATEMENT = "CREDIT_CARD_STATEMENT",
  PROFESSIONAL_IDENTIFICATION_CARD = "PROFESSIONAL_IDENTIFICATION_CARD",
  SOCIAL_SECURITY_CARD = "SOCIAL_SECURITY_CARD",
  POSTAL_IDENTITY_CARD = "POSTAL_IDENTITY_CARD"
}

// identity rejection reasons
export enum IdentityRejectReason {
  ID_INVALID_DATA = "ID_INVALID_DATA",
  ID_UNSUPPORTED = "ID_UNSUPPORTED",
  ID_INSUFFICIENT_QUALITY = "ID_INSUFFICIENT_QUALITY",
  ID_EXPIRED = "ID_EXPIRED",
  ID_UNDERAGE = "ID_UNDERAGE",
  ID_DATA_MISMATCH = "ID_DATA_MISMATCH",
  ID_COMPROMISED = "ID_COMPROMISED",
  SELFIE_MISMATCH = "SELFIE_MISMATCH",
  SELFIE_INSUFFICIENT_QUALITY = "SELFIE_INSUFFICIENT_QUALITY",
  UNKNOWN = "UNKNOWN"
}

// supported ISO 3166-1 alpha-3 country code list
export enum CountryCode {
  AFG = "AFG",
  ALA = "ALA",
  ALB = "ALB",
  DZA = "DZA",
  ASM = "ASM",
  AND = "AND",
  AGO = "AGO",
  AIA = "AIA",
  ATA = "ATA",
  ATG = "ATG",
  ARG = "ARG",
  ARM = "ARM",
  ABW = "ABW",
  AUS = "AUS",
  AUT = "AUT",
  AZE = "AZE",
  BHS = "BHS",
  BHR = "BHR",
  BGD = "BGD",
  BRB = "BRB",
  BLR = "BLR",
  BEL = "BEL",
  BLZ = "BLZ",
  BEN = "BEN",
  BMU = "BMU",
  BTN = "BTN",
  BOL = "BOL",
  BES = "BES",
  BIH = "BIH",
  BWA = "BWA",
  BVT = "BVT",
  BRA = "BRA",
  IOT = "IOT",
  BRN = "BRN",
  BGR = "BGR",
  BFA = "BFA",
  BDI = "BDI",
  CPV = "CPV",
  KHM = "KHM",
  CMR = "CMR",
  CAN = "CAN",
  CYM = "CYM",
  CAF = "CAF",
  TCD = "TCD",
  CHL = "CHL",
  CHN = "CHN",
  CXR = "CXR",
  CCK = "CCK",
  COL = "COL",
  COM = "COM",
  COG = "COG",
  COD = "COD",
  COK = "COK",
  CRI = "CRI",
  CIV = "CIV",
  HRV = "HRV",
  CUB = "CUB",
  CUW = "CUW",
  CYP = "CYP",
  CZE = "CZE",
  DNK = "DNK",
  DJI = "DJI",
  DMA = "DMA",
  DOM = "DOM",
  ECU = "ECU",
  EGY = "EGY",
  SLV = "SLV",
  GNQ = "GNQ",
  ERI = "ERI",
  EST = "EST",
  SWZ = "SWZ",
  ETH = "ETH",
  FLK = "FLK",
  FRO = "FRO",
  FJI = "FJI",
  FIN = "FIN",
  FRA = "FRA",
  GUF = "GUF",
  PYF = "PYF",
  ATF = "ATF",
  GAB = "GAB",
  GMB = "GMB",
  GEO = "GEO",
  DEU = "DEU",
  GHA = "GHA",
  GIB = "GIB",
  GRC = "GRC",
  GRL = "GRL",
  GRD = "GRD",
  GLP = "GLP",
  GUM = "GUM",
  GTM = "GTM",
  GGY = "GGY",
  GIN = "GIN",
  GNB = "GNB",
  GUY = "GUY",
  HTI = "HTI",
  HMD = "HMD",
  VAT = "VAT",
  HND = "HND",
  HKG = "HKG",
  HUN = "HUN",
  ISL = "ISL",
  IND = "IND",
  IDN = "IDN",
  IRN = "IRN",
  IRQ = "IRQ",
  IRL = "IRL",
  IMN = "IMN",
  ISR = "ISR",
  ITA = "ITA",
  JAM = "JAM",
  JPN = "JPN",
  JEY = "JEY",
  JOR = "JOR",
  KAZ = "KAZ",
  KEN = "KEN",
  KIR = "KIR",
  PRK = "PRK",
  KOR = "KOR",
  KWT = "KWT",
  KGZ = "KGZ",
  LAO = "LAO",
  LVA = "LVA",
  LBN = "LBN",
  LSO = "LSO",
  LBR = "LBR",
  LBY = "LBY",
  LIE = "LIE",
  LTU = "LTU",
  LUX = "LUX",
  MAC = "MAC",
  MKD = "MKD",
  MDG = "MDG",
  MWI = "MWI",
  MYS = "MYS",
  MDV = "MDV",
  MLI = "MLI",
  MLT = "MLT",
  MHL = "MHL",
  MTQ = "MTQ",
  MRT = "MRT",
  MUS = "MUS",
  MYT = "MYT",
  MEX = "MEX",
  FSM = "FSM",
  MDA = "MDA",
  MCO = "MCO",
  MNG = "MNG",
  MNE = "MNE",
  MSR = "MSR",
  MAR = "MAR",
  MOZ = "MOZ",
  MMR = "MMR",
  NAM = "NAM",
  NRU = "NRU",
  NPL = "NPL",
  NLD = "NLD",
  NCL = "NCL",
  NZL = "NZL",
  NIC = "NIC",
  NER = "NER",
  NGA = "NGA",
  NIU = "NIU",
  NFK = "NFK",
  MNP = "MNP",
  NOR = "NOR",
  OMN = "OMN",
  PAK = "PAK",
  PLW = "PLW",
  PSE = "PSE",
  PAN = "PAN",
  PNG = "PNG",
  PRY = "PRY",
  PER = "PER",
  PHL = "PHL",
  PCN = "PCN",
  POL = "POL",
  PRT = "PRT",
  PRI = "PRI",
  QAT = "QAT",
  REU = "REU",
  ROU = "ROU",
  RUS = "RUS",
  RWA = "RWA",
  BLM = "BLM",
  SHN = "SHN",
  KNA = "KNA",
  LCA = "LCA",
  MAF = "MAF",
  SPM = "SPM",
  VCT = "VCT",
  WSM = "WSM",
  SMR = "SMR",
  STP = "STP",
  SAU = "SAU",
  SEN = "SEN",
  SRB = "SRB",
  SYC = "SYC",
  SLE = "SLE",
  SGP = "SGP",
  SXM = "SXM",
  SVK = "SVK",
  SVN = "SVN",
  SLB = "SLB",
  SOM = "SOM",
  ZAF = "ZAF",
  SGS = "SGS",
  SSD = "SSD",
  ESP = "ESP",
  LKA = "LKA",
  SDN = "SDN",
  SUR = "SUR",
  SJM = "SJM",
  SWE = "SWE",
  CHE = "CHE",
  SYR = "SYR",
  TWN = "TWN",
  TJK = "TJK",
  TZA = "TZA",
  THA = "THA",
  TLS = "TLS",
  TGO = "TGO",
  TKL = "TKL",
  TON = "TON",
  TTO = "TTO",
  TUN = "TUN",
  TUR = "TUR",
  TKM = "TKM",
  TCA = "TCA",
  TUV = "TUV",
  UGA = "UGA",
  UKR = "UKR",
  ARE = "ARE",
  GBR = "GBR",
  USA = "USA",
  UMI = "UMI",
  URY = "URY",
  UZB = "UZB",
  VUT = "VUT",
  VEN = "VEN",
  VNM = "VNM",
  VGB = "VGB",
  VIR = "VIR",
  WLF = "WLF",
  ESH = "ESH",
  XKX = "XKX",
  YEM = "YEM",
  ZMB = "ZMB",
  ZWE = "ZWE"
}

export enum Nationality {
  AFG = "AFG",
  ALB = "ALB",
  DZA = "DZA",
  AND = "AND",
  AGO = "AGO",
  AIA = "AIA",
  ATG = "ATG",
  ARG = "ARG",
  ARM = "ARM",
  AUS = "AUS",
  AUT = "AUT",
  AZE = "AZE",
  BHS = "BHS",
  BHR = "BHR",
  BGD = "BGD",
  BRB = "BRB",
  BLR = "BLR",
  BEL = "BEL",
  BLZ = "BLZ",
  BEN = "BEN",
  BMU = "BMU",
  BTN = "BTN",
  BOL = "BOL",
  BIH = "BIH",
  BWA = "BWA",
  BRA = "BRA",
  GBR = "GBR",
  BRN = "BRN",
  BGR = "BGR",
  BFA = "BFA",
  MMR = "MMR",
  BDI = "BDI",
  KHM = "KHM",
  CMR = "CMR",
  CAN = "CAN",
  CPV = "CPV",
  CYM = "CYM",
  CAF = "CAF",
  TCD = "TCD",
  CHL = "CHL",
  CHN = "CHN",
  COL = "COL",
  COM = "COM",
  COG = "COG",
  COD = "COD",
  COK = "COK",
  CRI = "CRI",
  HRV = "HRV",
  CUB = "CUB",
  CYP = "CYP",
  CZE = "CZE",
  DNK = "DNK",
  DJI = "DJI",
  DMA = "DMA",
  DOM = "DOM",
  NLD = "NLD",
  TLS = "TLS",
  ECU = "ECU",
  EGY = "EGY",
  ARE = "ARE",
  GNQ = "GNQ",
  ERI = "ERI",
  EST = "EST",
  ETH = "ETH",
  FJI = "FJI",
  PHL = "PHL",
  FIN = "FIN",
  FRA = "FRA",
  GAB = "GAB",
  GMB = "GMB",
  GEO = "GEO",
  DEU = "DEU",
  GHA = "GHA",
  GIB = "GIB",
  GRC = "GRC",
  GRL = "GRL",
  GRD = "GRD",
  GTM = "GTM",
  GNB = "GNB",
  GIN = "GIN",
  GUY = "GUY",
  HTI = "HTI",
  HND = "HND",
  HKG = "HKG",
  HUN = "HUN",
  ISL = "ISL",
  IND = "IND",
  IDN = "IDN",
  IRN = "IRN",
  IRQ = "IRQ",
  IRL = "IRL",
  ISR = "ISR",
  ITA = "ITA",
  CIV = "CIV",
  JAM = "JAM",
  JPN = "JPN",
  JOR = "JOR",
  KAZ = "KAZ",
  KEN = "KEN",
  KNA = "KNA",
  KIR = "KIR",
  KWT = "KWT",
  KGZ = "KGZ",
  LAO = "LAO",
  LVA = "LVA",
  LBN = "LBN",
  LBR = "LBR",
  LBY = "LBY",
  LIE = "LIE",
  LTU = "LTU",
  LUX = "LUX",
  MAC = "MAC",
  MKD = "MKD",
  MDG = "MDG",
  MWI = "MWI",
  MYS = "MYS",
  MDV = "MDV",
  MLI = "MLI",
  MLT = "MLT",
  MHL = "MHL",
  MTQ = "MTQ",
  MRT = "MRT",
  MUS = "MUS",
  MEX = "MEX",
  FSM = "FSM",
  MDA = "MDA",
  MCO = "MCO",
  MNG = "MNG",
  MNE = "MNE",
  MSR = "MSR",
  MAR = "MAR",
  LSO = "LSO",
  MOZ = "MOZ",
  NAM = "NAM",
  NRU = "NRU",
  NPL = "NPL",
  NZL = "NZL",
  NIC = "NIC",
  NER = "NER",
  NGA = "NGA",
  NIU = "NIU",
  NOR = "NOR",
  OMN = "OMN",
  PAK = "PAK",
  PLW = "PLW",
  PSE = "PSE",
  PAN = "PAN",
  PNG = "PNG",
  PRY = "PRY",
  PER = "PER",
  POL = "POL",
  PRT = "PRT",
  QAT = "QAT",
  ROU = "ROU",
  RUS = "RUS",
  RWA = "RWA",
  SLV = "SLV",
  SMR = "SMR",
  WSM = "WSM",
  STP = "STP",
  SAU = "SAU",
  SRB = "SRB",
  SYC = "SYC",
  SLE = "SLE",
  SGP = "SGP",
  SVK = "SVK",
  SVN = "SVN",
  SLB = "SLB",
  SOM = "SOM",
  ZAF = "ZAF",
  KOR = "KOR",
  SSD = "SSD",
  ESP = "ESP",
  LKA = "LKA",
  SHN = "SHN",
  LCA = "LCA",
  SDN = "SDN",
  SUR = "SUR",
  SWZ = "SWZ",
  ALA = "ALA",
  CHE = "CHE",
  SYR = "SYR",
  TWN = "TWN",
  TJK = "TJK",
  TZA = "TZA",
  THA = "THA",
  TGO = "TGO",
  TON = "TON",
  TTO = "TTO",
  TUN = "TUN",
  TUR = "TUR",
  TKM = "TKM",
  TCA = "TCA",
  TUV = "TUV",
  UGA = "UGA",
  UKR = "UKR",
  URY = "URY",
  UZB = "UZB",
  VAT = "VAT",
  VUT = "VUT",
  VEN = "VEN",
  VNM = "VNM",
  VCT = "VCT",
  WLF = "WLF",
  YEM = "YEM",
  ZMB = "ZMB",
  ZWE = "ZWE",
}

// identity verification info callback
export interface IdentityCallbackInfo {
  id: string;
  userId: string;
  transactionId: string;
  status: VerificationStatus;
  idType: IdentityIdType | null;
  idNumber: string | null;
  idCountry: string | null;
  idFirstName: string | "N/A" | null;
  idLastName: string | "N/A" | null;
  idDob: string | null;
  idExpiry: string | null;
  rejectReason: IdentityRejectReason | null;
  isManualReview: boolean;
  callbackJSON: string | null;
  transactionDate: string | null;
  callbackDate: string | null;
  createdDate: string | null;
  updatedDate: string | null;
}

// address verification info callback
export interface AddressCallbackInfo {
  id: string;
  userId: string;
  transactionId: string;
  countryCode: CountryCode;
  city: string;
  state: string | null;
  postalCode: string | null;
  address: string;
  status: VerificationStatus;
  createdDate: string | null;
  updatedDate: string | null;
}

// nationality verification info callback
export interface NationalityCallbackInfo {
  id: string;
  userId: string;
  transactionId: string;
  nationality: Nationality;
  status: VerificationStatus;
  createdDate: string | null;
  updatedDate: string | null;
}

// transaction info
export interface Transaction {
  id: string;
  integratorId: string;
  userId: string;
  createdDate: string;
  updatedDate: string;
}

// possible user status
export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED"
}

export interface User {
  id: string;
  email: string;
  role: string;
  scopes: string[];
  status: UserStatus;
  createdDate: string;
  updatedDate: string;
}

// callback payload
export interface CallbackInfo {
  transaction: Transaction;
  user: User;
  identityVerification: IdentityCallbackInfo | null;
  addressVerification: AddressCallbackInfo | null;
  nationalityVerification: NationalityCallbackInfo | null;
}

// initiation request data
export interface InitiateRequest {
  country?: CountryCode;
  firstName?: string;
  lastName?: string;
  email?: string;
}

// initiation request response data
export interface InitiateResponse {
  transactionId: string;
  url: string;
}

// required constructor options
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
      baseUrl: "https://app.verifyonce.com/api/verify",
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

  async initiate(data?: InitiateRequest): Promise<InitiateResponse> {
    const response = await this.api.post<InitiateResponse>("/initiate", data);

    return response.data;
  }

  verifyCallbackInfo(body: string) {
    return verify(body, this.options.password) as CallbackInfo;
  }
}
