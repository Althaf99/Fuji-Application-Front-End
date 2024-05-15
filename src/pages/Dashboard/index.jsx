import React from "react";

import PageLayout from "../../components/PageLayout";

import { Grid } from "@mui/material";

import { styles } from "./styles";

import IncomeByMonth from "./incomeByMonth.jsx";
import ByItemName from "./byItemName.jsx";

const Dashboard = () => {
  const classes = styles();

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout pageHeading={"Dashboard"}>
        <Grid item container justifyContent={"space-between"} spacing={1}>
          <Grid item xs={12}>
            <ByItemName />
          </Grid>
          <Grid item xs={12}>
            <IncomeByMonth />
          </Grid>
        </Grid>
      </PageLayout>
    </Grid>
  );
};
export default Dashboard;
