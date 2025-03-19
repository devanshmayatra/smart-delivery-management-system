"use client"
import { AssignmentPageProps } from "@/types/assignmentPageProps";
import { AssignmentMetrics } from "@/components/ui/AssignmentMetrics";

const page = ({ activeAssignments, metrics, partners }: AssignmentPageProps) => {
  return (
    <AssignmentMetrics />
  );
}

export default page
