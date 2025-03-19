"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IOrder } from "@/types/order";
import AddOrderModal from "./AddOrderModal";
import { toast } from "sonner";

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
      } catch {
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

  const handleChangeStatus = async (orderID: string, newStatus: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${orderID}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        toast.warning("Failed to update status:");
        return;
      }

        // setOrders((prevOrders) =>
        //   prevOrders.map((order) =>
        //     order._id === orderID ? { ...order, status: newStatus } : order
        //   )
        // );
      setLoading(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (newOrder: IOrder) => {
    try {
      setLoading(true);
      const sanitizedOrder = { ...newOrder };
      if (sanitizedOrder.assignedTo === null) delete sanitizedOrder.assignedTo;
  
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedOrder),
      });
  
      if (!response.ok) {
        toast.warning("Failed to add order:");
        return;
      }
  
      const addedOrder = await response.json();
      toast.success("Order added:", addedOrder);

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
  
      await response.json();
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
                              onClick={() => handleAssignPartner(order._id!, partner._id)}
                            >
                              {partner.name}
                            </Button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">Change Status</Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 space-y-2">
                          {["pending", "assigned", "picked", "delivered", "failed"].map((status) => (
                            <Button
                              key={status}
                              className="w-full"
                              onClick={() => handleChangeStatus(order._id!, status)}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
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
