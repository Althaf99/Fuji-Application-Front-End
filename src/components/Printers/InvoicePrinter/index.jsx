import React, { forwardRef, useRef } from "react";

import Grid from "@material-ui/core/Grid";

import PrintableTable from "../../../components/PrintableTable";

import Fuji from "../../../Fuji.png";

import { styles } from "./Styles";

import useInvoiceByInvoiceNo from "../../../hooks/services/useGetInvoiceByInvoiceNo";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "No",
    accessor: "no",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "5%",
  },
  {
    Header: "Description",
    accessor: "item",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "35%",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
    width: "20%",
  },
  {
    Header: "Rate",
    accessor: "unitPrice",
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
    width: "15%",
  },

  {
    Header: "Amount",
    accessor: "amount",
    cell: (value) => Number.parseFloat(value).toFixed(2),
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
    width: "25%",
  },
];

export const InvoicePrinter = forwardRef((props, ref) => {
  const classes = styles();

  const { data: invoiceData } = useInvoiceByInvoiceNo({
    invoiceNo: props?.invoiceNo,
  });
  invoiceData?.sort((a, b) => a.itemName.localeCompare(b.itemName));

  let no = 0;
  invoiceData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  const filteredObject = invoiceData?.filter(
    (obj) => obj.invoiceNo == props.invoiceNo
  )[0];

  const marginTop = "10px";
  const marginRight = "25px";
  const marginBottom = "10px";
  const marginLeft = "25px";
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  const pageStyle = `
  @page {
    size: A4;
  }
  @media all {
    .page-break {
      display: none;
    }
  }
  @media print {
    .page-break {
      page-break-before: always;
    }
    width: 100%;
    .header, .footer {
      /* Your header and footer styles from styles.js here */
    }
  }
`;

  return (
    <>
      <div ref={ref} className={classes.body}>
        <Grid container classes={{ container: classes.gridContainer }}>
          <Grid item container spacing={2} justifyContent="space-between">
            <Grid item xs={12}>
              <img src={Fuji} alt="react logo" className={classes.image} />
            </Grid>
            <Grid item>
              <Grid>Panagamuwa</Grid>
              <Grid>Postal Code: 60052 </Grid>
              <Grid>Kurunegala</Grid>
              <Grid>Telephone : 0372 251 231 </Grid>
              <Grid>Mobile : 0777 132 121</Grid>
            </Grid>
            {filteredObject && invoiceData && (
              <Grid item>
                <Grid>To : M/S Rainco pvt Ltd </Grid>
                <Grid>Date of Invoice : {filteredObject?.invoiceDate}</Grid>
                <Grid>PO No : {filteredObject?.po}</Grid>
                <Grid>Invoice No : R / PO / {props.invoiceNo} </Grid>
                <Grid>PO Date : {filteredObject?.poDate}</Grid>
              </Grid>
            )}
          </Grid>
          <Grid className={classes.heading}>Invoice ( Part Delivery )</Grid>
          <Grid item xs={12}>
            {invoiceData && columns && (
              <PrintableTable
                columns={columns}
                data={invoiceData}
                hiddenColumns={["itemCode", "id"]}
                fontSize="24px"
                color="#FFFFFF"
              />
            )}
          </Grid>
          <Grid item className={classes.totalAmount}>
            Total :{" "}
            {props.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Grid>
          <Grid item xs={5} className={classes.signature}>
            <Grid>---------------------------------</Grid>
            <Grid>Manager,</Grid>
            <Grid>Fujicraft Electrical Accessories</Grid>
          </Grid>
        </Grid>
        <style>{getPageMargins()}</style>
        <style>{pageStyle}</style>
      </div>
    </>
  );
});
