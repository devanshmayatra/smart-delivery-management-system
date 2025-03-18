"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IDeliveryPartner } from "@/types/partner";
import { useRouter } from "next/navigation";
import AddAreaModal from "./AddAreaModal";
import PartnerForm from "./PartnerForm";

export default function PartnersList() {
  const [partners, setPartners] = useState<IDeliveryPartner[]>([]);
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        setPartners(data.data)
        console.log(data.data)
      })
      .catch((err) => console.error("Error fetching partners:", err));
  }, []);

  const handleNewArea = (newArea: { id: string; name: string }) => {
    setAreas((prev) => [...prev, newArea]);
  };

  const handlePartnerSubmit = async (newPartner: IDeliveryPartner) => {
    // Simulate API call
    const response = await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPartner),
    });

    if (response.ok) {
      const addedPartner = await response.json();
      setPartners((prev) => [...prev, addedPartner]); // Update UI
    }
  };

  return (
    <Card className="mt-6 p-2 w-9/10 lg:w-8/10 m-auto">
      <CardHeader className="flex justify-between">
        <CardTitle>Delivery Partners</CardTitle>
        <div className="flex gap-3">
        <AddAreaModal onAreaAdded={handleNewArea} />
        <PartnerForm onSubmit={handlePartnerSubmit} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Areas</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <TableRow key={partner._id}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>
                    <span className={partner.status === "active" ? "text-green-500" : "text-red-500"}>
                      {partner.status}
                    </span>
                  </TableCell>
                  <TableCell>{partner.areas?.map((area) => area.name).join(", ") || "No areas assigned"}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => router.push(`/partners/edit/${partner._id}`)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No partners found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
