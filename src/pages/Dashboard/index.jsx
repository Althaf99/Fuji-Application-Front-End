import React, { useEffect, useState } from "react";

import PageLayout from "../../components/PageLayout";

import { Grid } from "@mui/material";

import { styles } from "./styles";

import IncomeByMonth from "./incomeByMonth.jsx";
import ByItemName from "./byItemName.jsx";

const Dashboard = () => {
  const classes = styles();

  const [chartWidth, setChartWidth] = useState(window.innerWidth);

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
        <Grid item container justifyContent={"space-between"} spacing={1}>
          <Grid item xs={12}>
            <ByItemName chartWidth={chartWidth} />
          </Grid>
          <Grid item xs={12}>
            <IncomeByMonth chartWidth={chartWidth} />
          </Grid>
        </Grid>
      </PageLayout>
    </Grid>
  );
};
export default Dashboard;
