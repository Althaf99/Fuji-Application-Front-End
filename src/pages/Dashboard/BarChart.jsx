import React from "react";
import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import useDeliveryNote from "../../hooks/services/useDeliveryNote.js";
import { Grid, FormControl, Paper, Typography } from "@mui/material";
import { styles } from "./styles.js";
import { changeIntoMonths } from "./helper.js";

const BarChart = ({ chartWidth }) => {
  const classes = styles();
  const { data: deliveryNoteData } = useDeliveryNote({});
  console.log("deliveryNoteData", deliveryNoteData);
  // Group and sum by month-year for bar chart
  const salesByMonth = {};
  deliveryNoteData?.forEach((item) => {
    if (!item.deliveryDate) return;
    const month = changeIntoMonths(item.deliveryDate);
    salesByMonth[month] = (salesByMonth[month] || 0) + (item.quantity || 0);
  });
  // Sort months by year and month
  const sortedMonths = Object.keys(salesByMonth).sort((a, b) => {
    const [ma, ya] = a.split(" ");
    const [mb, yb] = b.split(" ");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (ya !== yb) return parseInt(ya) - parseInt(yb);
    return months.indexOf(ma) - months.indexOf(mb);
  });
  const barData = sortedMonths.map((month) => ({
    month,
    quantity: salesByMonth[month],
  }));

  return (
    <Paper className={classes.itemChart}>
      Bar Chart
      <MuiBarChart
        dataset={
          barData.length > 0 ? barData : [{ item: "No Data", quantity: 0 }]
        }
        xAxis={[{ scaleType: "band", dataKey: "item" }]}
        series={[{ dataKey: "quantity", label: "Quantity" }]}
        width={`${chartWidth}`}
        height={300}
      />
    </Paper>
  );
};

export default BarChart;
