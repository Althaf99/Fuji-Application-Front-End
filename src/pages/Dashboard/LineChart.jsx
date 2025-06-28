import React from "react";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import useInvoice from "../../hooks/services/useInvoice.js";
import { changeIntoMonths } from "./helper.js";

const LineChart = ({ chartWidth }) => {
  // Fetch invoice data
  const { data: invoiceData } = useInvoice({});

  // Line chart: Income by month
  const monthlyIncome = {};
  invoiceData?.forEach((item) => {
    const month = item.invoiceDate
      ? changeIntoMonths(item.invoiceDate)
      : undefined;
    if (month) {
      monthlyIncome[month] = (monthlyIncome[month] || 0) + (item.amount || 0);
    }
  });
  // Sort months by year and month
  const sortedMonths = Object.keys(monthlyIncome).sort((a, b) => {
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
  const lineData = sortedMonths.map((month) => ({
    month,
    sales: monthlyIncome[month],
  }));

  return (
    <MuiLineChart
      dataset={
        lineData.length > 0 ? lineData : [{ month: "No Data", sales: 0 }]
      }
      xAxis={[
        { scaleType: "point", dataKey: "month", width: 800, height: 1680 },
      ]}
      series={[{ dataKey: "sales", label: "Sales" }]}
      width={`${chartWidth}`}
      height={300}
    />
  );
};

export default LineChart;
