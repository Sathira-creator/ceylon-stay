import React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';


const LineChartRevenue = ({
    title,
    data,
    height = 350,
}) => {

    const xData = data.map((item) => item.xData);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ width: "100%" }}>

            <LineChart
            width={800}
            height={height}
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
                color: "#4f5bff",
                },
                {
                label: "Online",
                data: data.map((d) => d.online),
                color: "#f5b82e",
                },
                {
                label: "Cash",
                data: data.map((d) => d.cash),
                color: "#ff4d5a",
                },
            ]}
            
            margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
            />
        </Box>
      </CardContent>
    </Card>
  )
}

export default LineChartRevenue
