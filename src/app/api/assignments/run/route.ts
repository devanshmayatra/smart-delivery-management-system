import { Area } from "@/models/area.model";
import { DeliveryPartner } from "@/models/deliveryPartner.model";
import { Order } from "@/models/order.model";
import { Assignment } from "@/models/assignment.model";
import { AssignmentMetrics } from "@/models/assignmentMetrics.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { IDeliveryPartner } from "@/types/partner";
import { initializeMetrics } from "@/utils/initializeMetrics";

connectDB();
await initializeMetrics();

export async function POST() {
  try {
    // Fetch required data
    const [allPartners, allOrders, allAreas, metrics] = await Promise.all([
      DeliveryPartner.find({ currentLoad: { $lt: 3 }, status: "active" }).sort({ name: 1 }),
      Order.find({ status: "pending" }).sort({ createdAt: 1 }),
      Area.find().sort({ name: 1 }),
      AssignmentMetrics.findOne(),
    ]);

    if (!metrics) throw new Error("Assignment Metrics not found!");

    // Create a mapping of area -> available partners
    const areaPartnerMap: Record<string, IDeliveryPartner[]> = {};
    allPartners.forEach((partner) => {
      if (!areaPartnerMap[partner.area]) areaPartnerMap[partner.area] = [];
      areaPartnerMap[partner.area].push(partner);
    });

    // Store assignments
    const assignments = [];
    const unassignedOrders = [];

    for (const order of allOrders) {
      let assigned = false;

      // Check for available partners in the same area
      if (areaPartnerMap[order.area]) {
        const partnersInArea = areaPartnerMap[order.area].sort((a, b) => a.currentLoad - b.currentLoad);
        const partner = partnersInArea.find((p) => p.currentLoad < 3);

        if (partner) {
          assignments.push({ orderId: order._id, partnerId: partner._id });
          partner.currentLoad += 1;
          assigned = true;
        }
      }

      // If no partner in the same area, assign to any available partner
      if (!assigned) {
        const nearestPartner = allPartners.find((p) => p.currentLoad < 3);
        if (nearestPartner) {
          assignments.push({ orderId: order._id, partnerId: nearestPartner._id });
          nearestPartner.currentLoad += 1;
        } else {
          unassignedOrders.push(order._id);
        }
      }
    }

    // ✅ Store Assignments in DB
    await Promise.all(
      assignments.map(async ({ orderId, partnerId }) => {
        await Order.findByIdAndUpdate(orderId, { status: "assigned", assignedTo: partnerId });
        await DeliveryPartner.findByIdAndUpdate(partnerId, { $inc: { currentLoad: 1 } });
        await Assignment.create({ orderId: orderId, partnerId: partnerId, status: "pending" });
      })
    );

    // ✅ Update Assignment Metrics
    const newTotalAssigned = metrics.totalAssigned + assignments.length;
    const successRate = newTotalAssigned > 0 ? (metrics.totalCompleted / newTotalAssigned) * 100 : 0;

    await AssignmentMetrics.updateOne(
      { _id: metrics._id },
      {
        $inc: { totalAssigned: assignments.length },
        $set: { successRate, updatedAt: new Date() },
        ...(unassignedOrders.length > 0
          ? {
              $push: {
                failureReasons: {
                  $each: unassignedOrders.map((id) => ({ reason: `No partner found for order ${id}` }))
                }
              }
            }
          : {})
      }
    );

    return NextResponse.json({ message: "Order assignment completed!", assignments, unassignedOrders }, { status: 200 });
  } catch (error) {
    console.error("Error assigning orders:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
  }
}