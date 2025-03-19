"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IOrder } from "@/types/order";
import AddOrderModal from "./AddOrderModal";

export default function OrderList() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partners, setPartners] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        setError("Error loading orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [loading]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        const data = await res.json();
        setPartners(data.data || []);
      } catch (err) {
        console.error("Error loading partners.", err);
      }
    };

    fetchPartners();
  }, []);

  const handleOrderSubmit = async (newOrder: IOrder) => {
    try {
      setLoading(true);
      // ✅ Remove null values if necessary
      const sanitizedOrder = { ...newOrder };
      if (sanitizedOrder.assignedTo === null) delete sanitizedOrder.assignedTo;
  
      console.log("Submitting order:", sanitizedOrder);
  
      // ✅ Send API request
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedOrder),
      });
  
      // ✅ Error Handling
      if (!response.ok) {
        console.error("Failed to add order:", await response.text());
        return;
      }
  
      const addedOrder = await response.json();
      console.log("Order added:", addedOrder);
  
      // ✅ Update UI (if setNewOrder exists)
      // setNewOrder((prev) => [...prev, addedOrder]);


      setLoading(false)
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleAssignPartner = async (orderID: string, partnerID: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID, partnerID }), // Ensure backend expects this format
      });
  
      if (!response.ok) {
        console.error("Failed to assign partner:", await response.text());
        return;
      }
  
      // ✅ Update orders list after assignment
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderID ? { ...order, assignedTo: partnerID } : order
        )
      );
  
      setLoading(false);
    } catch (error) {
      console.error("Error assigning partner:", error);
      setLoading(false);
    }
  };
  

  const getStatusBadge = (status: string) => {
    const statusVariants: Record<string, string> = {
      pending: "bg-yellow-500 text-white",
      completed: "bg-green-500 text-white",
      cancelled: "bg-red-500 text-white",
    };
    return <Badge className={`px-2 py-1 ${statusVariants[status] || "bg-gray-500 text-white"}`}>{status}</Badge>;
  };

  return (
    <Card className="mt-6 w-11/12 lg:w-9/12 m-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Order List</CardTitle>
        <AddOrderModal addOrder={handleOrderSubmit} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center">No orders available.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assign</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{`${order.scheduledFor.split('T')[0]} - ${order.scheduledFor.split('T')[1]}`}</TableCell>
                    <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm" disabled={order.assignedTo === null ? false : true}>Assign</Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 space-y-2">
                          {partners.map((partner) => (
                            <Button
                              key={partner._id}
                              className="w-full"
                              onClick={() => handleAssignPartner(order._id, partner._id)}
                            >
                              {partner.name}
                            </Button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
