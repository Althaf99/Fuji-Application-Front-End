import React, { useState, useEffect } from "react";

import { Grid, FormControl, Paper, Typography } from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import { styles } from "./styles.js";

import { formatDate } from "./helper.js";

import CustomSelectDateRange from "../../components/CustomSelectDateRange/index.jsx";
import LabelledEditableSelect from "../../components/LabelledEditableSelect/index.js";

import useInvoice from "../../hooks/services/useInvoice.js";
import useDeliveryNote from "../../hooks/services/useDeliveryNote.js";

const ByItemName = () => {
  const classes = styles();

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterType, setFilterType] = useState();

  const filtersTypeArray = [
    { name: "Sales", value: "sales" },
    { name: "Income", value: "income" },
  ];

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  //Income Data

  const { data: invoiceData } = useInvoice({
    startDate: startDate ? formatDate(startDate) : startDate,
    endDate: endDate ? formatDate(endDate) : endDate,
  });

  const invoiceDataArray = [{}];
  invoiceData?.forEach((item) => {
    const existingItem = invoiceDataArray?.find(
      (i) => i.itemName === item.itemName
    );

    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      invoiceDataArray?.push({
        no: item.no,
        itemName: item.itemName,
        amount: item.amount,
      });
    }
  });

  // Sales Data
  const { data: deliveryNoteData } = useDeliveryNote({
    startDate: startDate ? formatDate(startDate) : startDate,
    endDate: endDate ? formatDate(endDate) : endDate,
  });

  const salesDataArray = [{}];

  deliveryNoteData?.forEach((item) => {
    const existingItem = salesDataArray?.find(
      (i) => i.itemName === item.itemName
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      salesDataArray?.push({
        no: item.no,
        itemName: item.itemName,
        quantity: item.quantity,
      });
    }
  });

  const chartSetting = {
    yAxis: [],
    width: 1600,
    height: 680,
  };

  const onChange = (update) => {
    setDateRange(update);
  };

  console.log("invoiceDataArray?.length > 0", invoiceDataArray?.length > 0);

  return (
    <Paper className={classes.itemChart}>
      <Grid item container justifyContent={"space-between"}>
        <Grid item xs={4}>
          <Typography variant="h5" sx={classes.templateTitle}>
            Filtered By Item Name
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid item container justifyContent={"space-between"}>
            <Grid item xs={6}>
              <LabelledEditableSelect
                id="itemName"
                name="itemName"
                placeholder={"SELECT FILTER"}
                onChange={(value) => setFilterType(value)}
                value={filterType}
                items={filtersTypeArray}
              />
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
        </Grid>
      </Grid>

      {invoiceDataArray?.length > 0 && salesDataArray?.length > 0 ? (
        <BarChart
          dataset={filterType === "sales" ? salesDataArray : invoiceDataArray}
          xAxis={[{ scaleType: "band", dataKey: "itemName" }]}
          series={[
            {
              dataKey: filterType === "sales" ? "quantity" : "amount",
              label: filterType === "sales" ? "Sales" : "Income",
            },
          ]}
          //   layout="horizontal"
          {...chartSetting}
          colors={["#F9ED69", "#CBF1F5"]}
          margin={{ left: 100, right: 100 }}
        />
      ) : (
        <>Hello World</>
      )}
    </Paper>
  );
};
export default ByItemName;
