"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PageSummary({ faults }: { faults: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg">
          <span className="font-semibold">Total Page Faults:</span>{" "}
          <span className="text-red-600">{faults}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <em>Red cells indicate a page fault (new load).</em>
        </div>
      </CardContent>
    </Card>
  );
}
