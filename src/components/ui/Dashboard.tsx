"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IDeliveryPartner } from "@/types/partner";
import { IOrder } from "@/types/order";
import { Assignment } from "@/types/assignment";
import { Areas } from "@/types/areas";

export default function Dashboard() {
  const [partners, setPartners] = useState<IDeliveryPartner[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [areas, setAreas] = useState<Areas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [partnersRes, ordersRes, assignmentsRes, areasRes] = await Promise.all([
          fetch("/api/partners").then((res) => res.json()),
          fetch("/api/orders").then((res) => res.json()),
          fetch("/api/assignments").then((res) => res.json()),
          fetch("/api/area").then((res) => res.json()),
        ]);

        setPartners(partnersRes.data || []);
        setOrders(ordersRes.data || []);
        setAssignments(assignmentsRes.data || []);
        console.log(assignmentsRes.data)
        setAreas(areasRes.data || []);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Partners Section */}
          <Card>
            <CardHeader>
              <CardTitle>Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner._id}>
                      <TableCell>{partner.name}</TableCell>
                      <TableCell>{partner._id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Assignments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment ID</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment._id}>
                      <TableCell>{assignment._id}</TableCell>
                      <TableCell>{assignment.partnerId.name}</TableCell>
                      <TableCell>{assignment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Areas Section */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {areas.map((area) => (
                  <li key={area._id} className="p-2 border-b">{area.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
