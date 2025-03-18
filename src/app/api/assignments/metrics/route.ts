import { AssignmentMetrics } from "@/models/assignmentMetrics.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { initializeMetrics } from "../../../../utils/initializeMetrics";

connectDB();
initializeMetrics();

export async function GET() {
  try {
    initializeMetrics();
    const metrics = await AssignmentMetrics.findOne();
    const response = {
      status: 200,
      message: "Metrics fetched succesfully.",
      data: metrics,
    }
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}