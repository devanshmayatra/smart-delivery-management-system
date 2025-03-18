"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { AssignmentPageProps } from "@/types/assignmentPageProps";

export default function AssignmentDashboard({ activeAssignments, metrics, partners }: AssignmentPageProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Partner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {activeAssignments.map((assignment) => (
            <TableRow key={assignment._id}>
              <TableCell>{assignment.orderId}</TableCell>
              <TableCell>{assignment.status}</TableCell>
              <TableCell>{assignment.partnerId || "Unassigned"}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>

      {/* Assign Orders Button */}
      <Button className="w-full">Assign Pending Orders</Button>
    </div>
  );
}
