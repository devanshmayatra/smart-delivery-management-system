import { Assignment } from "@/models/assignment.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { initializeMetrics } from "@/utils/initializeMetrics";

connectDB();
initializeMetrics();

export async function GET(req: NextRequest) {
  try {
    const assignments = await Assignment.find().populate({
      path: "partnerId",
      select: "name email phone",
    }).populate({
      path: "orderId",
      select: "orderNumber customer.name status scheduledFor",
    });
    const response = {
      status: 200,
      message: "Assignments retrieved Succesfully",
      data: assignments,
      noOfAssignments: assignments.length
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