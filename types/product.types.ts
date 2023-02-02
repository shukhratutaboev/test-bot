export type IProduct = Partial<{
  id: number;
  name: string;
  hit: number;
  organizationId: number;
  productType: number;
  power: number;
  liter: number;
  crystalType: string;
  price: number;
  priceWithCompensation: number;
  compensationOnly: boolean;
  installationMethod: string;
  description: string;
  images: Array<any>;
  properties: object;
}>;
