import { IDeliveryPartner } from "./partner";

export interface PartnerPageProps {
  partners: IDeliveryPartner[];
  metrics: {
    totalActive: number;
    avgRating: number;
    topAreas: string[];
  };
}