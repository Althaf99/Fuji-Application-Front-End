import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid, FormControl } from "@material-ui/core";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomSelectDateRange from "../../../components/CustomSelectDateRange/index.jsx";
import { PoBalancePrinter } from "../../../components/Printers/PoBalancePrinter/index";

import ManageRequest from "../ManageRequest";

import useRequest from "../../../hooks/services/useRequest";
import useRequestNumbers from "../../../hooks/services/useRequestNumbers";

import { formatDate } from "./helper.js";

import ListPurchaseOrderOptionalPanel from "./ListPurchaseOrderOptionalPanel";

import { UserContext } from "../../../components/UserContext/index.jsx";

const ListPurchaseOrder = () => {
  const classes = styles();
  const navigate = useNavigate();
  const componentRef = useRef();

  const [itemName, setItemName] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [list, setList] = useState(0);
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState();

  const { itemNames, itemColors } = useContext(UserContext);
  const { data: requestNumbers } = useRequestNumbers();

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

  const requestNumbersArray =
    requestNumbers &&
    requestNumbers.length > 0 &&
    requestNumbers.map(({ id, requestNumber }) => ({
      name: requestNumber,
      value: requestNumber,
    }));

  const { data: requestData } = useRequest({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
    startDate: startDate ? formatDate(startDate) : startDate,
    endDate: endDate ? formatDate(endDate) : endDate,
  });

  useEffect(() => {
    let sum = 0;
    const test = requestData && requestData.map((item) => item.quantity);
    test && test.forEach((element) => setList((sum += element)));
  }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

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
      Header: "PO Number",
      accessor: "po",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Item",
      accessor: "item",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "Item Name",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "Item Color",
      accessor: "itemColor",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "Balance",
      accessor: "quantity",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => <>{value.toLocaleString()}</>,
      width: "12%",
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",

      Cell: ({ value }) => (
        <>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),
    },
    {
      Header: "PO Date",
      accessor: "date",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <ListPurchaseOrderOptionalPanel
            values={values}
            setOpenPurchaseOrder={setOpenPurchaseOrder}
            setSelectedPurchaseOrder={setSelectedPurchaseOrder}
          />
        );
      },
    },
  ];

  const handleCreatePurchaseOrder = () => {
    setOpenPurchaseOrder(true);
  };

  const filteredRequestArray = requestData?.filter(
    (element) => element.quantity > 0
  );

  let no = 0;
  filteredRequestArray?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  const handlePrintPOBalance = () => {
    navigate(`/poBalancePrinter`);
  };

  const onChange = (update) => {
    setDateRange(update);
  };

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Purchase Order"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-create-purchase-order"
                variant="contained"
                onClick={handleCreatePurchaseOrder}
              >
                <NoteAddTwoToneIcon className={classes.plusIcon} />
                {"Create Purchase Order"}
              </Button>
            </Grid>
            <Grid item>
              <ReactToPrint
                trigger={() => (
                  <Button
                    id="btn-create-invoice"
                    variant="contained"
                    onClick={handlePrintPOBalance}
                  >
                    <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                    {"Print Po Balance"}
                  </Button>
                )}
                content={() => componentRef.current}
                documentTitle={`PO Balance ${formatDate(new Date())}`}
              />
              <Grid style={{ display: "none" }}>
                <PoBalancePrinter ref={componentRef} />
              </Grid>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={2} className={classes.section}>
            <FormControl fullWidth>
              <span className={classes.label}>DATE RANGE</span>
              <CustomSelectDateRange
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="PO NUMBER"
              id="requestNum"
              name="requestNum"
              placeholder="Select PO Number"
              onChange={(value) => setRequestNumber(value)}
              value={requestNumber}
              items={requestNumbersArray}
            />
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
          {/* <Grid item xs={0} className={classes.totalAmount}>
              {list}
            </Grid> */}
        </Grid>

        <Grid item className={classes.section} xs={12}>
          {filteredRequestArray && (
            <LazyLoadingTable
              columns={columns}
              data={filteredRequestArray}
              hiddenColumns={["id", "itemName", "itemColor"]}
              maxHeightInRows={10}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
              customProps={{ height: "570px" }}
            />
          )}
        </Grid>
      </PageLayout>
      {openPurchaseOrder === true && (
        <ManageRequest
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          requestNumbersArray={requestNumbersArray}
          openPurchaseOrder={openPurchaseOrder}
          setOpenPurchaseOrder={setOpenPurchaseOrder}
          selectedPurchaseOrder={selectedPurchaseOrder}
          setSelectedPurchaseOrder={setSelectedPurchaseOrder}
        />
      )}
    </Grid>
  );
};
export default ListPurchaseOrder;
