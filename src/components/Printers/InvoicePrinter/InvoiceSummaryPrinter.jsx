import React, { useState, useEffect, forwardRef } from "react";
import Grid from "@mui/material/Grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrintableTable from "../../../components/PrintableTable";
import { styles } from "./Styles";

const columns = [
  {
    Header: "No",
    accessor: "no",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "5%",
  },
  {
    Header: "Invoice Date",
    accessor: "invoiceDate",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
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
 const startDate =  props.startDate; 
 const endDate =  props.startDate; 
 const data =  props.invoiceData; 
  const classes = styles();

 


  const totalAmount = data?.reduce((sum, invoice) => sum + invoice.amount, 0);

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
        <Grid item xs={12}>
          {data && columns && (
            <PrintableTable
              columns={columns}
              data={data}
              fontSize="24px"
              color="#FFFFFF"
            />
          )}
        </Grid>
        <Grid item className={classes.totalAmount}>
          Total:{" "}
          {totalAmount?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Grid>
      </Grid>
      <style>{pageStyle}</style>
    </div>
  );
});
