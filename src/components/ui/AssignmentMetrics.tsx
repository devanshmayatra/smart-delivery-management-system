"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IAssignmentMetrics } from "@/types/assignmentMetrics";

export const AssignmentMetrics = () => {
  const [metrics, setMetrics] = useState<IAssignmentMetrics>({
    totalAssigned: 0,
    successRate: 0,
    averageTime: 0,
    totalCompleted: 0,
    failureReasons: [{
      reason: "",
      count: 0,
    }]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/assignments/metrics");
        const data = await res.json();
        console.log(data)
        setMetrics(data.data);
      } catch (err) {
        setError("Error loading metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleAssignOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/assignments/run", { method: "POST" });
      if (!res.ok) throw new Error("Failed to assign orders");
      setLoading(false);
      window.location.reload(); // Refresh data
    } catch (err) {
      setError("Error assigning orders.");
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6 w-11/12 lg:w-9/12 m-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Assignment Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Loading metrics...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Total Assigned</TableHead>
                  <TableHead>Total Completed</TableHead>
                  <TableHead>Success Rate (%)</TableHead>
                  <TableHead>Average Time (mins)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{metrics.totalAssigned}</TableCell>
                  <TableCell>{metrics.totalCompleted}</TableCell>
                  <TableCell>{metrics.successRate.toFixed(2)}</TableCell>
                  <TableCell>{metrics.averageTime.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <h3 className="mt-4 font-semibold">Failure Reasons</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.failureReasons.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button className="mt-4 w-full" onClick={handleAssignOrders} disabled={loading}>
              {loading ? "Assigning..." : "Assign All Unassigned Orders"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
