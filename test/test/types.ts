/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND.
 * Instead, modify the source OpenAPI file and regenerate
 */

export type PhoneNumber = string;
export type Person = {
  id: string;
  [k: string]: unknown;
} & BasePerson;
export type RegisteredBusiness = SharedBusiness & {
  type: "llc" | "corp" | "partnership";
  ein: string;
  [k: string]: unknown;
};
export type SoleProprietorship = SharedBusiness & {
  type: "soleprop";
  [k: string]: unknown;
};
export type LLC = RegisteredBusiness & {
  type: "llc";
  [k: string]: unknown;
};
export type Corporation = RegisteredBusiness & {
  type: "corp";
  [k: string]: unknown;
};
export type Partnership = RegisteredBusiness & {
  type: "partnership";
  [k: string]: unknown;
};
export type BaseBusiness = LLC | SoleProprietorship | Corporation | Partnership;
export type Business = {
  id: string;
  [k: string]: unknown;
} & BaseBusiness;
export type BusinessResponse = Business & {
  persons: Person[];
  [k: string]: unknown;
};
export type BusinessPostRequest = BaseBusiness & {
  persons?: BasePerson[];
  [k: string]: unknown;
};

export interface Schema {
  PhoneNumber: PhoneNumber;
  Address: Address;
  BasePerson: BasePerson;
  Person: Person;
  SharedBusiness: SharedBusiness;
  RegisteredBusiness: RegisteredBusiness;
  SoleProprietorship: SoleProprietorship;
  LLC: LLC;
  Corporation: Corporation;
  Partnership: Partnership;
  BaseBusiness: BaseBusiness;
  Business: Business;
  BusinessUpdated: BusinessUpdated;
  BusinessResponse: BusinessResponse;
  PersonResponse: Person;
  BusinessPatchRequest: BusinessPatchRequest;
  PersonPatchRequest: PersonPatchRequest;
  BusinessPostRequest: BusinessPostRequest;
  GetBusiness200Response: BusinessResponse;
  CreateBusinessRequestBody: BusinessPostRequest;
  CreateBusiness200Response: BusinessResponse;
  PatchBusinessRequestBody: BusinessPatchRequest;
  PatchBusiness200Response: BusinessResponse;
  GetPerson200Response: Person;
  PatchPersonRequestBody: PersonPatchRequest;
  PatchPerson200Response: Person;
  [k: string]: unknown;
}
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state:
    | "AL"
    | "AK"
    | "AS"
    | "AZ"
    | "AR"
    | "CA"
    | "CO"
    | "CT"
    | "DE"
    | "DC"
    | "FM"
    | "FL"
    | "GA"
    | "GU"
    | "HI"
    | "ID"
    | "IL"
    | "IN"
    | "IA"
    | "KS"
    | "KY"
    | "LA"
    | "ME"
    | "MH"
    | "MD"
    | "MA"
    | "MI"
    | "MN"
    | "MS"
    | "MO"
    | "MT"
    | "NE"
    | "NV"
    | "NH"
    | "NJ"
    | "NM"
    | "NY"
    | "NC"
    | "ND"
    | "MP"
    | "OH"
    | "OK"
    | "OR"
    | "PW"
    | "PA"
    | "PR"
    | "RI"
    | "SC"
    | "SD"
    | "TN"
    | "TX"
    | "UT"
    | "VT"
    | "VI"
    | "VA"
    | "WA"
    | "WV"
    | "WI"
    | "WY";
  postalCode: string;
  country: "US";
  [k: string]: unknown;
}
export interface BasePerson {
  type: "control_person" | "ubo";
  ssnToken: string;
  userId?: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: PhoneNumber;
  cell?: PhoneNumber;
  dateOfBirth: string;
  address: Address;
  ownershipPercentage: number;
  [k: string]: unknown;
}
export interface SharedBusiness {
  type: string;
  legalName: string;
  dba: string;
  phone: PhoneNumber;
  website: string;
  address: Address;
  shippingAddress: Address;
  /**
   * Industry classification code. [Learn More](https://www.census.gov/naics/)
   */
  naicsCode: string;
  description: string;
  typeOfProductsOrServices: string;
  numberOfEmployees: number;
  numberOfYearsAtLocation: number;
  annualRevenue: number;
  [k: string]: unknown;
}
/**
 * Most likely will be broken in to multiple events.
 */
export interface BusinessUpdated {
  type?: string;
  timestamp: string;
  data?: Business & {
    persons: Person[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface BusinessPatchRequest {
  legalName?: string;
  dba?: string;
  phone?: string;
  website?: string;
  address?: Address;
  [k: string]: unknown;
}
export interface PersonPatchRequest {
  /**
   * Confirm if this is required...
   */
  type?: "control_person" | "ubo";
  userId?: string;
  firstName?: string;
  lastName?: string;
  ssnToken?: string;
  email?: string;
  phone?: string;
  cell?: string;
  dob?: string;
  address?: Address;
  title?: string;
  ownershipPercentage?: number;
  [k: string]: unknown;
}
