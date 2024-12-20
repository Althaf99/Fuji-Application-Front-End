import React, { forwardRef } from "react";

import Grid from "@material-ui/core/Grid";

import PrintableTable from "../../../components/PrintableTable";

import { styles } from "./styles";

import useReport from "../../../hooks/services/useReport";

import { formatDate } from "../../../pages/PurchaseOrder/ManageRequest/helper";

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
    width: "1%",
  },
  {
    Header: "Item",
    accessor: "item",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "35%",
  },
  {
    Header: "PO Balance",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
    width: "25%",
  },
];

export const PoBalancePrinter = forwardRef((props, ref) => {
  const classes = styles();

  const { data: report } = useReport({
    itemName: "",
    itemColor: "",
    requestNumber: "",
    date: "",
  });

  console.log("report",report)

  const filteredRequestArray = report?.filter(
    (element) => element.quantity > 0
  );

  filteredRequestArray?.sort((a, b) => a.itemName.localeCompare(b.itemName));

  const resultArray = [];

  filteredRequestArray?.forEach((item) => {
    const existingItem = resultArray.find(
      (i) => i.itemName === item.itemName && i.itemColor === item.itemColor
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      resultArray.push({
        no: item.no,
        item: `${item.itemName} ${item.itemColor}`,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        itemColor: item.itemColor,
        itemName: item.itemName,
      });
    }
  });

  let no = 0;
  resultArray?.forEach((element) => {
    no = no + 1;
    element.no = no;
  });

  const marginTop = "10px";
  const marginRight = "15px";
  const marginBottom = "10px";
  const marginLeft = "15px";
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
    <Grid
      ref={ref}
      item
      container
      spacing={2}
      justifyContent="space-around"
      xs={12}
      className={classes.printComponent}
    >
      <table>
        <thead>
          <Grid item>
            <Grid>Date : {formatDate(new Date())}</Grid>
          </Grid>
          <Grid className={classes.heading}>PO Balance</Grid>
          <Grid className={classes.heading}>
            --------------------------------------------------------------------------------
          </Grid>
        </thead>
        <tbody>
          {resultArray && columns && (
            <PrintableTable
              columns={columns}
              data={resultArray}
              customProps={{ height: "600px" }}
              hiddenColumns={["id"]}
              fontSize="24px"
              color="#FFFFFF"
            />
          )}
        </tbody>
      </table>
      <style>{getPageMargins()}</style>
      <style>{pageStyle}</style>
    </Grid>
  );
});
