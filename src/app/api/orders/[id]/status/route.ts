import { initializeMetrics } from "@/utils/initializeMetrics";
import { Assignment } from "@/models/assignment.model";
import { AssignmentMetrics } from "@/models/assignmentMetrics.model";
import { Order } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { DeliveryPartner } from "@/models/deliveryPartner.model";

connectDB();
await initializeMetrics();

export async function PUT(req: NextRequest) {
  try {

    initializeMetrics();

    const { status } = await req.json();
    const url = new URL(req.url);
    const orderId = url.pathname.split("/")[3];
    let assignment;
    let assignmentMetrics


    if (status === 'delivered') {
      assignment = await Assignment.findOneAndUpdate({ orderId: orderId }, {
        $set: {
          status: 'success',
        }
      }, { new: true });
      assignmentMetrics = await AssignmentMetrics.findByIdAndUpdate({ _id: "metrics" }, {
        $inc: {
          totalCompleted: 1,
        }
      }, { new: true });
      const successRate = (assignmentMetrics.totalCompleted / assignmentMetrics.totalAssigned) * 100;

      assignmentMetrics = await AssignmentMetrics.findByIdAndUpdate({ _id: "metrics" }, {
        $set: {
          successRate: successRate
        }
      }, { new: true });
      await DeliveryPartner.findByIdAndUpdate({
        _id: assignment.partnerId
      }, {
        $inc: {
          currentLoad: -1
        }
      });
    }

    const order = await Order.findByIdAndUpdate({
      _id: orderId,
    }, {
      $set: {
        status
      }
    }, {
      new: true
    });

    console.log(order)
    const response = {
      status: 200,
      message: "Order status updated successfully",
      data: order,
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