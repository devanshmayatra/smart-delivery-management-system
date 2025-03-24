import { DeliveryPartner } from "@/models/deliveryPartner.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { initializeMetrics } from "@/utils/initializeMetrics";
import { Area } from "@/models/area.model";

connectDB();
initializeMetrics();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const deliveryPartnerId = url.pathname.split("/").pop();
    console.log(body)
    const bodyAreas = body.areas;
    const areaIds = await Promise.all(
      bodyAreas.map(async (area: string) => {
        const existingArea = await Area.findOne({ name: area });
        return existingArea ? existingArea._id.toString() : null; // Handle missing areas
      })
    );

    const validAreaIds = areaIds.filter((id) => id !== null);
    body.areas = validAreaIds;
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
      deliveryPartnerId,
      { $set: body },
      { new: true }
    );

    if (!updatedPartner) {
      return NextResponse.json({ error: "Delivery Partner not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPartner, { status: 200 });

    return NextResponse.json({ error: "Delivery Partner not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const deliveryPartnerId = url.pathname.split("/").pop();
    const deliveryPartner = await DeliveryPartner.findByIdAndDelete(deliveryPartnerId);
    if (deliveryPartner) {
      return NextResponse.json("Partner Deleted Succesfully", { status: 200 });
    }
    return NextResponse.json({ error: "Delivery Partner not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}