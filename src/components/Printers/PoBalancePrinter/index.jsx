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
  },
  {
    Header: "ItemColor",
    accessor: "itemColor",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "ItemName",
    accessor: "itemName",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "PO Balance",
    accessor: "poBalanceQuantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
  },
  {
    Header: "Stock Balance",
    accessor: "stockBalanceQuantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
  },
  {
    Header: "Total Shots",
    accessor: "totalShots",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Total Hours",
    accessor: "totalHours",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

export const PoBalancePrinter = forwardRef((props, ref) => {
  const classes = styles();

  const { data: report } = useReport();
  const filteredRequestArray = report?.filter(
    (element) => element.poBalanceQuantity > 0
  );

  // Aggregating poBalanceQuantity
  const aggregatedRequestArray = [];
  const itemMap = new Map();

  filteredRequestArray?.forEach((item) => {
    const key = `${item.itemName}-${item.itemColor}`;

    if (itemMap.has(key)) {
      const existingItem = itemMap.get(key);
      existingItem.poBalanceQuantity += item.poBalanceQuantity;
    } else {
      itemMap.set(key, { ...item });
    }
  });

  aggregatedRequestArray.push(...itemMap.values());

  aggregatedRequestArray.sort((a, b) => a.itemName.localeCompare(b.itemName));

  let no = 0;
  aggregatedRequestArray.forEach((element) => {
    no = no + 1;
    element.no = no;
    element.item = `${element.itemName} ${element.itemColor}`;
  });

  const updatedDataArray = aggregatedRequestArray.map((obj) => {
    const totalShots =
      obj.poBalanceQuantity > obj.stockBalanceQuantity
        ? (
            (obj.poBalanceQuantity - obj.stockBalanceQuantity) /
            obj.cavity
          ).toFixed(0)
        : 0;

    const totalHours =
      obj.poBalanceQuantity > obj.stockBalanceQuantity
        ? (
            ((obj.poBalanceQuantity - obj.stockBalanceQuantity) *
              obj.cycleTime) /
            (obj.cavity * 3600)
          ).toFixed(0)
        : 0;

    return {
      ...obj,
      totalHours,
      totalShots,
    };
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
    size: A4 landscape;
    margin: 0;
  }
  @media print {
    .printable-container {
      width: 100%;
      margin: 0 auto;
    }
    table {
      width: 90%;
      border-collapse: collapse;
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
          {updatedDataArray && columns && (
            <PrintableTable
              columns={columns}
              data={updatedDataArray}
              customProps={{ height: "600px" }}
              hiddenColumns={["id", "itemName", "itemColor"]}
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
