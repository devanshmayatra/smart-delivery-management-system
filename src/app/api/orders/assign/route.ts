import { Assignment } from "@/models/assignment.model";
import { DeliveryPartner } from "@/models/deliveryPartner.model";
import { Order } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { initializeMetrics } from "../../../../utils/initializeMetrics";
import { AssignmentMetrics } from "@/models/assignmentMetrics.model";

connectDB();
initializeMetrics();

export async function POST(req: NextRequest) {
  try {
    initializeMetrics();
    const body = await req.json();
    console.log(body)
    const { orderID, partnerID } = body;
    const order = await Order.findById({ _id: orderID });
    if (!order) {
      return NextResponse.json('Order not found', { status: 404, });
    }
    if (order.status === 'assigned') {
      return NextResponse.json('Order is already assigned', { status: 400, });
    }
    const partner = await DeliveryPartner.findById(partnerID);
    if (!partner) {
      return NextResponse.json('Partner not found', { status: 404, });
    }

    await Order.findByIdAndUpdate({
      _id: orderID,
    }, {
      $set: {
        status: 'assigned',
        assignedTo: partnerID
      }
    }, { new: true });

    await DeliveryPartner.findByIdAndUpdate({
      _id: partnerID,
    }, {
      $inc: {
        currentLoad: 1
      }
    }, { new: true });

    const assignment = new Assignment({
      orderId: orderID,
      partnerId: partnerID,
    });
    await assignment.save();


    const metrics = await AssignmentMetrics.findOneAndUpdate({
      _id: "metrics",
    }, {
      $inc: {
        totalAssigned: 1
      }
    }, { new: true });

    const successRate = (metrics.totalCompleted / metrics.totalAssigned) * 100;

  await AssignmentMetrics.findByIdAndUpdate({ _id: "metrics" }, {
      $set: {
        successRate: successRate
      }
    }, { new: true });

    const response = {
      status: 200,
      message: 'Order assigned successfully',
      order: assignment,
      metrics: metrics,
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