import { Area } from "@/models/area.model";
import { DeliveryPartner } from "@/models/deliveryPartner.model";
import { connectDB } from "@/utils/db";
import { initializeMetrics } from "@/utils/initializeMetrics";
import { NextRequest, NextResponse } from "next/server";

connectDB();
await initializeMetrics();

export async function GET(req: NextRequest) {
  try {
    const deliveryPartners = await DeliveryPartner.find().populate({
      path: "areas",
      select: "name",
    });
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
    console.log(body)
    // const areas = await Area.find();
    const bodyAreas = body.areas;
    const areaIds = await Promise.all(
      bodyAreas.map(async (area: string) => {
        const existingArea = await Area.findOne({ name: area });
        return existingArea ? existingArea._id.toString() : null; // Handle missing areas
      })
    );
    
    // Remove null values (if any area wasn't found)
    const validAreaIds = areaIds.filter((id) => id !== null);
    
    body.areas = validAreaIds;

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