import React, { useState, useEffect, useRef, useContext } from "react";

import { styles } from "./styles";

import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import FormControl from "@material-ui/core/FormControl";

import LazyLoadingTable from "../../components/LazyLoadingTable";
import PageLayout from "../../components/PageLayout";
import LabelledEditableSelect from "../../components/LabelledEditableSelect";
import { ExcessSheetPrinter } from "../../components/Printers/ExcessSheetPrinter";
import CustomSelectDateRange from "../../components/CustomSelectDateRange/index.jsx";

import OptionPanel from "./option-panel/index.js";

import { formatDate } from "../PurchaseOrder/ListPurchaseOrder/helper.js";

import useExcess from "../../hooks/services/useExcess";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import ManageExcess from "./ManageExcess/index.jsx";

import { UserContext } from "../../components/UserContext/index.jsx";

const ListExcess = () => {
  const classes = styles();

  const componentRef = useRef();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { itemNames, itemColors } = useContext(UserContext);

  const [openManageExcessDialogBox, setOpenManageExcessDialogBox] = useState();

  const [selectedExcess, setSelectedExcess] = useState();

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

  const { data: excessData } = useExcess({
    itemName: itemName,
    itemColor: itemColor,
    startDate: startDate ? formatDate(startDate) : startDate,
    endDate: endDate ? formatDate(endDate) : endDate,
  });

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
      Header: "Item Name",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "25%",
    },
    {
      Header: "Item Color",
      accessor: "itemColor",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "25%",
    },
    {
      Header: "Item",
      accessor: "item",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "25%",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => <>{value.toLocaleString()}</>,
      width: "25%",
    },
    {
      Header: "Delivered Date",
      accessor: "excessDeliveredDate",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "25%",
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "25%",

      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <OptionPanel
            values={values}
            setOpenManageExcessDialogBox={setOpenManageExcessDialogBox}
            setSelectedExcess={setSelectedExcess}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  const handlePrintExcess = () => {
    navigate("/excessSheetPrinter");
  };

  let itd = 0;
  excessData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    itd = itd + 1;
    element.no = itd;
  });

  const onChange = (update) => {
    setDateRange(update);
  };

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Excess"}
          pageActions={
            <Grid item container spacing={2}>
              <Grid item>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      id="btn-create-invoice"
                      variant="contained"
                      onClick={handlePrintExcess}
                    >
                      <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                      {"Print Excess Sheet"}
                    </Button>
                  )}
                  content={() => componentRef.current}
                  documentTitle={`Excess Sheet ${formatDate(startDate)}`}
                />
                <div style={{ display: "none" }}>
                  <ExcessSheetPrinter
                    ref={componentRef}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </Grid>
            </Grid>
          }
        >
          <Grid container spacing={2} className={classes.topCards}>
            <Grid item xs={2} className={classes.section}>
              <FormControl fullWidth>
                <span className={classes.label}>Date Range</span>
                <CustomSelectDateRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onChange}
                />
              </FormControl>
            </Grid>
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
          {excessData && (
            <Grid item className={classes.section} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={excessData}
                InfiniteScroll={false}
                hiddenColumns={["id", "itemName", "itemColor"]}
                maxHeightInRows={15}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
                customProps={{ height: "400px" }}
              />
            </Grid>
          )}
        </PageLayout>
      </Grid>
      {openManageExcessDialogBox && (
        <ManageExcess
          openManageExcessDialogBox={openManageExcessDialogBox}
          setOpenManageExcessDialogBox={setOpenManageExcessDialogBox}
          selectedExcess={selectedExcess}
          setSelectedExcess={setSelectedExcess}
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
        />
      )}
    </>
  );
};
export default ListExcess;
