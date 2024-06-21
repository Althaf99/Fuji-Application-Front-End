import React from "react";

import { Grid, Paper, Typography } from "@mui/material";

import { LineChart } from "@mui/x-charts/LineChart";

import { styles } from "./styles.js";

import { changeIntoMonths } from "./helper.js";

import useInvoice from "../../hooks/services/useInvoice.js";
import useDeliveryNote from "../../hooks/services/useDeliveryNote.js";

const IncomeByMonth = ({ chartWidth }) => {
  const classes = styles();

  const { data: invoiceData } = useInvoice({});

  invoiceData?.forEach((element) => {
    element.month = changeIntoMonths(element.invoiceDate);
  });

  const invoiceDataArray = [];
  invoiceData?.forEach((item) => {
    const existingItem = invoiceDataArray?.find((i) => i.month === item.month);
    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      invoiceDataArray?.push({
        amount: item.amount,
        month: item.month,
      });
    }
  });

  // Sales Data
  const { data: deliveryNoteData } = useDeliveryNote({});

  const salesDataArray = [];

  deliveryNoteData?.forEach((element) => {
    element.month = changeIntoMonths(element.deliveryDate);
  });

  deliveryNoteData?.forEach((item) => {
    const existingItem = salesDataArray?.find((i) => i.month === item.month);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      salesDataArray?.push({
        quantity: item.quantity,
        month: item.month,
      });
    }
  });

  const finalArray = [];
  invoiceDataArray?.forEach((item) => {
    const existingItem = salesDataArray?.find((i) => i.month === item.month);
    if (existingItem) {
      finalArray?.push({
        amount: item.amount,
        month: item.month,
        quantity: existingItem.quantity,
      });
    }
  });
  const chartSetting = {
    yAxis: [],
    width: `${chartWidth}`,
    height: 680,
  };

  return (
    <Paper className={classes.itemChart}>
      <Grid item container justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h5" sx={classes.templateTitle}>
            Income and Sales By Month
          </Typography>
        </Grid>
      </Grid>

      {finalArray?.length > 0 && (
        <LineChart
          dataset={finalArray}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "amount", label: "Income" },
            { dataKey: "quantity", label: "Sales" },
          ]}
          layout="horizontal"
          {...chartSetting}
          colors={["#FAEF5D", "#FF004D"]}
          margin={{ left: 100, right: 100 }}
        />
      )}
    </Paper>
  );
};
export default IncomeByMonth;
