import React from "react";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";
import useInvoice from "../../hooks/services/useInvoice.js";
import useDeliveryNote from "../../hooks/services/useDeliveryNote.js";

const PieChart = ({ chartWidth }) => {
  // Fetch invoice and delivery note data
  const { data: invoiceData } = useInvoice({});
  const { data: deliveryNoteData } = useDeliveryNote({});

  // Example: Pie chart showing sales distribution by itemName
  const salesByItem = {};
  deliveryNoteData?.forEach((item) => {
    if (item.itemName) {
      salesByItem[item.itemName] =
        (salesByItem[item.itemName] || 0) + (item.quantity || 0);
    }
  });
  const pieData = Object.entries(salesByItem).map(([label, value], idx) => ({
    id: idx,
    value,
    label,
  }));

  return (
    <MuiPieChart
      series={[
        {
          data:
            pieData.length > 0
              ? pieData
              : [{ id: 0, value: 1, label: "No Data" }],
          innerRadius: 40,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
        },
      ]}
      width={`${chartWidth}`}
      height={300}
    />
  );
};

export default PieChart;
