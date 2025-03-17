import { DeliveryPartner } from "@/models/deliveryPartner.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const deliveryPartners = await DeliveryPartner.find();
    const response = {
      status: 200,
      message:"Partners retrieved Succesfully",
      data: deliveryPartners,
      noOfPartners: deliveryPartners.length
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
    const deliveryPartner = new DeliveryPartner(body);
    await deliveryPartner.save();
    return NextResponse.json(deliveryPartner, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}