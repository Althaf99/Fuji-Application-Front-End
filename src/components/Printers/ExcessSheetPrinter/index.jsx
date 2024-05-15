import React, { forwardRef } from "react";

import Grid from "@material-ui/core/Grid";

import PrintableTable from "../../../components/PrintableTable";

import Fuji from "../../../Fuji.png";

import { styles } from "./Styles";

import useExcess from "../../../hooks/services/useExcess";

import { formatDate } from "./helper.js";

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
    width: "10%",
  },
  {
    Header: "Item",
    accessor: "item",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
  },
  {
    Header: "Delivered Date",
    accessor: "excessDeliveredDate",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

export const ExcessSheetPrinter = forwardRef((props, ref) => {
  const classes = styles();

  const { data: excessData } = useExcess({
    startDate: props?.startDate
      ? formatDate(props?.startDate)
      : props?.startDate,
    endDate: props?.endDate ? formatDate(props?.endDate) : props?.endDate,
  });

  let no = 0;
  excessData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

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
        <table className="print-component">
          <thead>
            <tr>
              <th>
                <Grid item container spacing={2} justifyContent="space-between">
                  <Grid item xs={12}>
                    <Grid>
                      <img
                        src={Fuji}
                        alt="react logo"
                        className={classes.image}
                      />
                    </Grid>
                  </Grid>
                  <Grid item style={{ paddingBottom: "10px" }}>
                    <Grid>
                      <div>
                        Panagamuwa, Postal Code : 60052, Kurunegala, Telephone
                        :0777 132 121, Mail: fujicraft12@gmail.com
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid>
                      Customer Name : <u>M/S Rainco Pvt.Ltd</u>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid>Date : {formatDate(props?.startDate)}</Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.heading}>
                  <u>Excess Sheet</u>
                </Grid>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Grid item xs={12}>
                  {excessData && columns && (
                    <PrintableTable
                      columns={columns}
                      data={excessData}
                      customProps={{ height: "600px" }}
                      hiddenColumns={["id"]}
                      fontSize="24px"
                      color="#FFFFFF"
                    />
                  )}
                </Grid>
              </td>
            </tr>
          </tbody>
          <tfoot className="table-footer">
            <tr>
              <td>
                <Grid container classes={{ container: classes.gridContainer }}>
                  <Grid item xs={12} className={classes.signature}>
                    <Grid>---------------------------------</Grid>
                    <Grid>Manager,</Grid>
                    <Grid>Fujicraft Electrical Accessories</Grid>
                  </Grid>
                </Grid>
              </td>
            </tr>
          </tfoot>
        </table>
        <style>{getPageMargins()}</style>
        <style>{pageStyle}</style>
      </div>
    </>
  );
});
