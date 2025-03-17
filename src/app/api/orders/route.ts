import { Order } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(req: NextRequest) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "assignedTo",
        select: "name email phone",
      });
    const response = {
      status: 200,
      message: "Orders retrieved successfully",
      data: orders,
      noOfOrders: orders.length,
    }
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Some unknown Error occured" }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existingOrder = await Order.findOne({ orderNumber: body.orderNumber });

    console.log(existingOrder);

    if (existingOrder) {
      return NextResponse.json({ error: "Order already exists" }, { status: 400 });
    }

    const order = new Order(body);
    await order.save();
    const response = {
      status: 200,
      message: "Order created successfully",
      data: order,
    }
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Some unknown Error occured" }, { status: 500 });
    }
  }
}