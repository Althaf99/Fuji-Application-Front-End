import React from "react";
import { ScatterChart as MuiScatterChart } from "@mui/x-charts";
import useInvoice from "../../hooks/services/useInvoice.js";

const ScatterChart = ({ chartWidth }) => {
  // Fetch invoice data
  const { data: invoiceData } = useInvoice({});
  console.log("ScatterChart invoiceData", invoiceData);
  // Scatter chart: Amount vs. Invoice Number
  const scatterData =
    (invoiceData &&
      invoiceData?.map((item, idx) => ({
        index: idx + 1, // Invoice index
        amount: item.amount || 0,
        label: item.invoiceNo || `Invoice ${idx + 1}`,
      }))) ||
    [];

  console.log("ScatterChart invoiceData", scatterData);

  return (
    <>
      {scatterData.length === 0 && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h3>No Data Available</h3>
          <p>Please check your invoice data or try again later.</p>
        </div>
      )}
      {/** Display the chart only if there is data */}
      {scatterData.length > 0 && (
        <MuiScatterChart
          dataset={
            scatterData.length > 0
              ? scatterData
              : [{ index: 0, amount: 0, label: "No Data" }]
          }
          series={[
            {
              dataKey: "amount",
              label: "Invoice Amounts",
            },
          ]}
          xAxis={[{ label: "Invoice Index", dataKey: "index" }]}
          yAxis={[{ label: "Amount", dataKey: "amount" }]}
          width={chartWidth}
          height={300}
        />
      )}
    </>
  );
};

export default ScatterChart;
