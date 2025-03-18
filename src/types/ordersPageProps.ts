import { IOrder } from "./order";

export interface OrdersPageProps {
  orders: IOrder[];
  filters: {
    status: string[];
    areas: string[];
    date: string;
  };
}