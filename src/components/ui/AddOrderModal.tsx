"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { IOrder } from "@/types/order";
import { toast } from "sonner";

interface Area {
  _id: string;
  name: string;
}

export default function AddOrderModal({
  addOrder,
}: {
  addOrder: (newOrder : any) => void;
}) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [open , setOpen] = useState(false);

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    customer: {
      name: "",
      phone: "",
      address: "",
    },
    area: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    status: "pending",
    scheduledFor: "12:00", // ✅ Default time format HH:mm
    assignedTo: null,
    totalAmount: 0,
  });

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/area");
        const data = await response.json();
        setAreas(data.data);
      } catch (error) {
        console.error("Failed to fetch areas:", error);
      }
    };

    fetchAreas();
  }, []);

  const updateOrderData = (field: string, value: any) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCustomerData = (field: string, value: string) => {
    setOrderData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = [...orderData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    const total = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    setOrderData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: total,
    }));
  };

  const addItem = () => {
    setOrderData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = orderData.items.filter((_, i) => i !== index);
    const total = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    setOrderData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: total,
    }));
  };

  const handleSubmit = () => {
    if (!orderData.orderNumber || !orderData.customer.name || !orderData.customer.phone) {
      toast.warning("Please fill all required fields!");
      return;
    }
    console.log(orderData)
    addOrder(orderData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full max-h-[80vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Order Number</Label>
            <Input
              placeholder="ORDxxxx"
              value={orderData.orderNumber}
              onChange={(e) => updateOrderData("orderNumber", e.target.value)}
            />
          </div>

          <div>
            <Label>Customer Name</Label>
            <Input
              placeholder="Enter customer name"
              value={orderData.customer.name}
              onChange={(e) => updateCustomerData("name", e.target.value)}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              placeholder="Enter phone number"
              value={orderData.customer.phone}
              onChange={(e) => updateCustomerData("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>Address</Label>
            <Textarea
              placeholder="Enter customer address"
              value={orderData.customer.address}
              onChange={(e) => updateCustomerData("address", e.target.value)}
            />
          </div>

          <div>
            <Label>Area</Label>
            <Select
              onValueChange={(value) => updateOrderData("area", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area._id} value={area._id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Items</Label>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
                <Input
                  type="number"
                  min="1"
                  className="w-16"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                />
                <Input
                  type="number"
                  min="0"
                  className="w-24"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", Number(e.target.value))
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addItem}>
              + Add Item
            </Button>
          </div>

          {/* Scheduled For (Time Only) */}
          <div>
            <Label>Scheduled Time</Label>
            <Input
              type="time"
              value={orderData.scheduledFor}
              onChange={(e) => updateOrderData("scheduledFor", e.target.value)}
            />
          </div>

          <div>
            <Label>Total Amount</Label>
            <Input value={`₹ ${orderData.totalAmount}`} readOnly />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Add Order</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
