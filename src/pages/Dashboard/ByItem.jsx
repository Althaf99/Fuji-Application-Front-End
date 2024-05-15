import React, { useState, useEffect } from "react";

import { Grid, FormControl, Paper, Typography } from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import { styles } from "./styles.js";

import { formatDate } from "./helper.js";

import CustomSelectDateRange from "../../components/CustomSelectDateRange/index.jsx";

import useDeliveryNote from "../../hooks/services/useDeliveryNote.js";

const ByItem = () => {
  const classes = styles();

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data: deliveryNoteData } = useDeliveryNote({
    startDate: startDate ? formatDate(startDate) : startDate,
    endDate: endDate ? formatDate(endDate) : endDate,
  });

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  let no = 0;
  deliveryNoteData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  const salesDataArray = [];

  deliveryNoteData?.forEach((item) => {
    const existingItem = salesDataArray?.find((i) => i.item === item.item);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      salesDataArray?.push({
        no: item.no,
        item: item.item,
        quantity: item.quantity,
      });
    }
  });

  const chartSetting = {
    xAxis: [
      {
        label: "Quantity",
      },
    ],
    width: 800,
    height: 1680,
  };

  const onChange = (update) => {
    setDateRange(update);
  };

  return (
    <Paper className={classes.itemChart}>
      <Grid item container justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h5" sx={classes.templateTitle}>
            ByItem
          </Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <CustomSelectDateRange
              startDate={startDate}
              endDate={endDate}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
      </Grid>

      {salesDataArray.length > 0 && (
        <BarChart
          dataset={salesDataArray}
          yAxis={[{ scaleType: "band", dataKey: "item" }]}
          series={[
            { dataKey: "quantity", label: "Sales" },
            { dataKey: "amount", label: "Income" },
          ]}
          layout="horizontal"
          {...chartSetting}
          colors={["#FFCF81 "]}
          margin={{ left: 150 }}
        />
      )}
    </Paper>
  );
};
export default ByItem;
