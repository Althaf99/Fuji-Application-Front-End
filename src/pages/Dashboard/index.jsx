import React, { useEffect, useState } from "react";

import PageLayout from "../../components/PageLayout";

import { Grid, Paper } from "@mui/material";

import { styles } from "./styles";

import IncomeByMonth from "./incomeByMonth.jsx";
import ByItemName from "./byItemName.jsx";
import AreaChart from "./AreaChart.jsx";
import PaymentStatusPie from "./PaymentStatusPie.jsx";
import useInvoice from "../../hooks/services/useInvoice.js";
import LineChart from "./LineChart.jsx";
import BarChart from "./BarChart.jsx";

const Dashboard = () => {
  const classes = styles();

  const [chartWidth, setChartWidth] = useState(window.innerWidth);

  const { data: invoiceData } = useInvoice({});

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout pageHeading={"Dashboard"}>
        {invoiceData && (
          <Grid item container justifyContent={"space-between"} spacing={1}>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <ByItemName chartWidth={chartWidth} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <IncomeByMonth chartWidth={chartWidth} />
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <AreaChart chartWidth={chartWidth} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <LineChart chartWidth={chartWidth} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <PaymentStatusPie chartWidth={chartWidth} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 16 }}>
                <BarChart chartWidth={chartWidth} />
              </Paper>
            </Grid> */}
          </Grid>
        )}
      </PageLayout>
    </Grid>
  );
};
export default Dashboard;
