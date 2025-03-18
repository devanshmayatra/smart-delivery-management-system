export interface Assignment {
  _id: string;
  orderId: string;
  partnerId: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'pending';
  reason?: string;
}