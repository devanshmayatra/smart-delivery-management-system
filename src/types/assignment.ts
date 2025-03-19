export interface Assignment {
  _id: string;
  orderId: string;
  partnerId: {
    email:string;
    name:string;
    phone:string;
    _id:string;
  };
  timestamp: Date;
  status: 'success' | 'failed' | 'pending';
  reason?: string;
}