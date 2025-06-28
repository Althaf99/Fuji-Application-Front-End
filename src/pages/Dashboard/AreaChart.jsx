import { LineChart as MuiLineChart } from "@mui/x-charts";
import useInvoice from "../../hooks/services/useInvoice.js";
import { changeIntoMonths } from "./helper.js";
import { Grid, FormControl, Paper, Typography } from "@mui/material";
import { styles } from "./styles.js";
const AreaChart = ({ chartWidth }) => {
  const { data: invoiceData } = useInvoice({});
  console.log("invoiceData", invoiceData);
  // Area chart: Cumulative income by month
  const monthlyIncome = {};
  invoiceData?.forEach((item) => {
    const month = item.invoiceDate
      ? changeIntoMonths(item.invoiceDate)
      : undefined;
    if (month) {
      monthlyIncome[month] = (monthlyIncome[month] || 0) + (item.amount || 0);
    }
  });
  let cumulative = 0;
  // Sort months by year and month
  const sortedMonths = Object.keys(monthlyIncome).sort((a, b) => {
    // a, b format: 'MMM YYYY'
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
  const areaData = sortedMonths.map((month) => {
    cumulative += monthlyIncome[month];
    return { month, cumulative };
  });
  const classes = styles();

  return (
    <Paper className={classes.itemChart}>
      <MuiLineChart
        dataset={
          areaData.length > 0 ? areaData : [{ month: "No Data", cumulative: 0 }]
        }
        xAxis={[{ scaleType: "point", dataKey: "month" }]}
        series={[
          { dataKey: "cumulative", label: "Cumulative Income", area: true },
        ]}
        width={`${chartWidth}`}
        height={300}
      />
    </Paper>
  );
};

export default AreaChart;
