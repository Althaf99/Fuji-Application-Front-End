import React from "react";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";
import useInvoice from "../../hooks/services/useInvoice.js";

const PaymentStatusPie = ({ chartWidth }) => {
  // Example: Pie chart showing paid vs unpaid invoices
  const { data: invoiceData } = useInvoice({});

  console.log(" PaymentStatusPie Chart invoiceData", invoiceData);

  const statusCount = { Paid: 0, Unpaid: 0 };
  invoiceData?.forEach((item) => {
    if (item.status && item.status.toLowerCase() === "paid") statusCount.Paid++;
    else statusCount.Unpaid++;
  });
  const pieData = [
    { id: 0, value: statusCount.Paid, label: "Paid" },
    { id: 1, value: statusCount.Unpaid, label: "Unpaid" },
  ];
  return (
    <MuiPieChart
      series={[
        {
          data: pieData,
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

export default PaymentStatusPie;
