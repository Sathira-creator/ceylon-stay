import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, Typography } from "@mui/material";

export default function BalanceSheetBarChart({
  title,
  data,
  height = 350,
}) {
  const xData = data.map((item) => item.xData);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: xData,
            },
          ]}
          series={[
            {
              label: "Total Reveue",
              data: data.map((d) => d.totalRevenue),
              stack: "assets",
              color: "#4f5bff",
            },
            {
              label: "Online",
              data: data.map((d) => d.online),
              stack: "balance",
              color: "#f5b82e",
            },
            {
              label: "Cash",
              data: data.map((d) => d.cash),
              stack: "balance",
              color: "#ff4d5a",
            },
          ]}
          height={height}
          margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
        />
      </CardContent>
    </Card>
  );
}
