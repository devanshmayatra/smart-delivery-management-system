import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}