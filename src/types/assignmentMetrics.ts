export interface IAssignmentMetrics {
  totalAssigned: number;
  successRate: number;
  averageTime: number;
  totalCompleted:number;
  failureReasons: {
    reason: string;
    count: number;
  }[];
}