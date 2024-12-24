import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

import OptionPanel from "./stockOptionalPanel.js";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import { StockPrinter } from "../../../components/Printers/StockPrinter/index.jsx";

import ManageStock from "../ManageStock/index.jsx";

import { formatDate } from "./helper.js";

import useStock from "../../../hooks/services/useStock";

import { UserContext } from "../../../components/UserContext/index.jsx";
import useUpdateStockById from "../../../hooks/services/useUpdateStockById.js";

const ListStock = () => {
  const classes = styles();
  const componentRef = useRef();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [selectedStock, setSelectedStock] = useState();


  const [openStockDialogBox, setOpenStockDialogBox] =
    useState(false);

  const { itemNames, itemColors } = useContext(UserContext);

  const itemNamesArray =
    itemNames &&
    itemNames.length > 0 &&
    itemNames.map(({ id, itemName }) => ({
      name: itemName,
      value: itemName,
    }));

  const itemColorsArray =
    itemColors &&
    itemColors.length > 0 &&
    itemColors.map(({ id, itemColor }) => ({
      name: itemColor,
      value: itemColor,
    }));

  const { data: stockData } = useStock({
    itemName: itemName,
    itemColor: itemColor,
  });


  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },  
    {
      Header: "No",
      accessor: "no",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "5%",
    },
    {
      Header: "ItemName",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
    },
    {
      Header: "ItemColor",
      accessor: "itemColor",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
    },
    {
      Header: "Item",
      accessor: "item",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
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
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <OptionPanel
            values={values}
            setOpenStockDialogBox={setOpenStockDialogBox}
            setSelectedStock={setSelectedStock}
          />
        );
      },
    },
  ];

  const handleCreateStock = () => {
    setOpenStockDialogBox(true);
  };

  const handlePrintStock = () => {
    navigate(`/stock`, {
      state: { date: formatDate(new Date()) },
    });
  };


  let no = 0;
  stockData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Stock"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-create-Delivery-Note"
                variant="contained"
                onClick={handleCreateStock}
              >
                <AddCircleOutlineIcon className={classes.plusIcon} />
                {"Add Stock"}
              </Button>
            </Grid>
            <Grid item>
              <ReactToPrint
                trigger={() => (
                  <Button
                    id="btn-create-invoice"
                    variant="contained"
                    onClick={handlePrintStock}
                  >
                    <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                    {"Print Stock"}
                  </Button>
                )}
                content={() => componentRef.current}
                documentTitle={`Stock ${formatDate(new Date())}`}
              />
              <div style={{ display: "none" }}>
                <StockPrinter
                  ref={componentRef}
                  itemName={itemName}
                  itemColor={itemColor}
                />
              </div>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="ITEM NAME"
              id="itemName"
              name="itemName"
              placeholder="Select Item Name"
              onChange={(value) => setItemName(value)}
              value={itemName}
              items={itemNamesArray}
            />
          </Grid>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="ITEM COLOR"
              id="itemColor"
              name="itemColor"
              placeholder="Select Item Color"
              onChange={(value) => setItemColor(value)}
              value={itemColor}
              items={itemColorsArray}
            />
          </Grid>
        </Grid>

        <Grid item className={classes.section} xs={12}>
          {stockData && (
            <LazyLoadingTable
              columns={columns}
              hasNextPage={false}
              data={stockData}
              hiddenColumns={["id", "itemName", "itemColor"]}
              maxHeightInRows={15}
              customProps={{ height: "565px" }}
              onClickTableRow={(index, row) => {
              }}
            />
          )}
        </Grid>
      </PageLayout>
      {openStockDialogBox === true && (
        <ManageStock
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          openStockDialogBox={openStockDialogBox}
          setOpenStockDialogBox={setOpenStockDialogBox}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
        />
      )}
    </Grid>
  );
};
export default ListStock;
