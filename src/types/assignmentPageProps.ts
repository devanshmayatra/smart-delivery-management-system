import { Assignment } from "./assignment";
import { AssignmentMetrics } from "./assignmentMetrics";

export interface AssignmentPageProps{
  activeAssignments: Assignment[];
  metrics: AssignmentMetrics;
  partners: {
  available: number;
  busy: number;
  offline: number;
  };
  }