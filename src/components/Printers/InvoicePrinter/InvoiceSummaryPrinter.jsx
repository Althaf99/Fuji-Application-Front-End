import React, { useState, useEffect, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrintableTable from "../../../components/PrintableTable";
import { styles } from "./Styles";
import useInvoicesByDateRange from "../../../hooks/services/useInvoicesByDateRange";

const columns = [
  {
    Header: "Invoice No",
    accessor: "invoiceNo",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Amount",
    accessor: "amount",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => (
      <>
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
];

export const InvoiceSummaryPrinter = forwardRef((props, ref) => {
  const classes = styles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const { data: invoices } = useInvoicesByDateRange({
    startDate: startDate && !isNaN(new Date(startDate)) ? startDate.toISOString() : null,
    endDate: endDate && !isNaN(new Date(endDate)) ? endDate.toISOString() : null,
  });

  useEffect(() => {
    if (invoices) {
      setFilteredData(invoices);
    }
  }, [invoices]);

  const totalAmount = filteredData.reduce((sum, invoice) => sum + invoice.amount, 0);

  const pageStyle = `
    @page {
      size: A4;
    }
    @media print {
      .page-break {
        page-break-before: always;
      }
    }
  `;

  return (
    <div ref={ref} className={classes.body}>
      <Grid container classes={{ container: classes.gridContainer }}>
        <Grid item container spacing={2} justifyContent="space-between">
          <Grid item>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
            />
          </Grid>
          <Grid item>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {filteredData && columns && (
            <PrintableTable
              columns={columns}
              data={filteredData}
              fontSize="24px"
              color="#FFFFFF"
            />
          )}
        </Grid>
        <Grid item className={classes.totalAmount}>
          Total:{" "}
          {totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Grid>
      </Grid>
      <style>{pageStyle}</style>
    </div>
  );
});
