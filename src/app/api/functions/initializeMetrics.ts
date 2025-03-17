import { AssignmentMetrics } from "@/models/assignmentMetrics.model";

const initializeMetrics = async () => {
  const existingMetrics = await AssignmentMetrics.findById("metrics");
  if (!existingMetrics) {
    await AssignmentMetrics.create({ _id: "metrics" ,}); // Creates only if it doesn’t exist
    console.log("AssignmentMetrics initialized!");
  }
};

export { initializeMetrics };
