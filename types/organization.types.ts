import { IRegion } from "./region.types";

export type IContact = Partial<{
  phone: string;
  organizationName: string;
  email: string;
  description: string;
  regionId: string;
  organizationId: number;
  organization: string;
  id: number;
  state: number;
  created_date: string;
  editedDate: string;
  updatedBy: string;
}>;
export type IOrganization = Partial<{
  id: number;
  organizationName: string;
  contact: IContact;
}>;

export type IOrgSeller = Partial<{
  id: number;
  organizationId: 0;
  email: string;
  organizationName: string;
  address: string;
  phone: string;
  description: string;
  region: IRegion;
}>;
