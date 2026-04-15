export interface IInquiryRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  selectedLicenses: string[];
  otherPlatforms?: string;
  message?: string;
  type: "SELLER" | "BUYER";
}
