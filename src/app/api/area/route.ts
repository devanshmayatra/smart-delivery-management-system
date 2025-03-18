import { Area } from "@/models/area.model";
import { connectDB } from "@/utils/db";
import { initializeMetrics } from "@/utils/initializeMetrics";
import { NextRequest, NextResponse } from "next/server";

connectDB();
initializeMetrics();

export async function GET() {
  try {
    const areas = await Area.find();
    const response = {
      status: 200,
      message: "Areas Fetched Succesfully",
      data: areas,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const area = new Area(body);
    await area.save();
    const response = {
      status: 201,
      message: "Area Created Succesfully",
      data: area
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