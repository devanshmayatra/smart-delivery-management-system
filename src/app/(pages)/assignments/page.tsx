"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { AssignmentPageProps } from "@/types/assignmentPageProps";
import { AssignmentMetrics } from "@/components/ui/AssignmentMetrics";

const page = ({ activeAssignments, metrics, partners }: AssignmentPageProps) => {
  return (
    <AssignmentMetrics />
  );
}

export default page
