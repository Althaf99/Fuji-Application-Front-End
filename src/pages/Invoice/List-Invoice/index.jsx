import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import ReactToPrint from "react-to-print";

import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControl from "@material-ui/core/FormControl";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import AlertDialogBox from "../../../components/AlertDialogBox";
import LabeledTextField from "../../../components/LabeledTextField";
import { InvoicePrinter } from "../../../components/Printers/InvoicePrinter";
import CustomSelectDateRange from "../../../components/CustomSelectDateRange/index.jsx";
import ManageInvoice from "../ManageInvoice/index.jsx";

import { formatDate } from "./helper.js";

import useInvoice from "../../../hooks/services/useInvoice";
import useAddInvoiceNo from "../../../hooks/services/useAddInvoiceNo";

import { UserContext } from "../../../components/UserContext/index.jsx";

const ListInvoice = () => {
  const classes = styles();

  const componentRef = useRef();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [list, setList] = useState(0);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [searchInvoiceNo, setSearchInvoiceNo] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [openManageInvoiceDialogBox, setOpenManageInvoiceDialogBox] =
    useState();

  const [selectedInvoice, setSelectedInvoice] = useState();

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

  const { data: invoiceData } = useInvoice({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
    invoiceNo: searchInvoiceNo,
    startDate: startDate ? formatDate(startDate) : null,
    endDate: endDate ? formatDate(endDate) : null,
  });

  const invoiceNoArray =
    invoiceData &&
    invoiceData.length > 0 &&
    invoiceData.map(({ id, invoiceNo }) => ({
      name: invoiceNo,
      value: invoiceNo,
    }));

  const uniqueInvoiceNo = new Set();

  // Create a new array without duplicate values
  const filteredInvoiceList = [];

  invoiceNoArray &&
    invoiceNoArray.forEach((item) => {
      const value = item.value;
      if (!uniqueInvoiceNo.has(value) && value > 0) {
        uniqueInvoiceNo.add(value);
        filteredInvoiceList.push(item);
      }
    });

  const requestNumbersArray =
    invoiceData &&
    invoiceData.length > 0 &&
    invoiceData.map(({ id, po }) => ({
      name: po,
      value: po,
    }));

  const uniqueValues = new Set();

  // Create a new array without duplicate values
  const filteredPOList = [];
  requestNumbersArray &&
    requestNumbersArray.forEach((item) => {
      const value = item.value;
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        filteredPOList.push(item);
      }
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
      Header: "Invoice Date",
      accessor: "invoiceDate",
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
      Header: "PO Date",
      accessor: "poDate",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "PO ",
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
      Header: "Quantity",
      accessor: "quantity",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
      Cell: ({ value }) => <>{value.toLocaleString()}</>,
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
      Header: "Amount",
      accessor: "amount",
      cell: (value) => Number.parseFloat(value).toFixed(2),
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => <>{value.toLocaleString()}</>,
      width: "15%",
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "right" },
      width: "10%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <OptionPanel
            values={values}
            setOpenManageInvoiceDialogBox={setOpenManageInvoiceDialogBox}
            setSelectedInvoice={setSelectedInvoice}
          />
        );
      },
    },
  ];
  const { mutateAsync: clusterUpdater } = useAddInvoiceNo({
    requestNo: requestNumber,
    invoiceDate: formatDate(startDate),
    invoiceNo: invoiceNo,
  });

  const handleAddInvoice = () => {
    setOpenInvoiceDialog(true);
  };
  const handleCloseDialogBox = () => {
    setOpenInvoiceDialog(false);
  };
  const handleSaveInvoiceNo = async () => {
    await clusterUpdater();
  };

  useEffect(() => {
    let sum = 0;
    const test = invoiceData?.map((item) => item.amount);
    test ? test.forEach((element) => setList((sum += element))) : setList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

  useEffect(() => {
    const invoiceList =
      (requestNumber?.length > 0 || searchInvoiceNo > 0) &&
      invoiceData &&
      invoiceData?.find((element) => element?.invoiceNo);

    setInvoiceNo(invoiceList ? invoiceList.invoiceNo : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, requestNumber, invoiceData]);

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  const handlePrintInvoice = () => {
    navigate(`/invoicePrinter`);
  };

  let no = 0;
  invoiceData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  const onChange = (update) => {
    setDateRange(update);
  };

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Invioce"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-create-invoice"
                variant="contained"
                onClick={handleAddInvoice}
              >
                <NoteAddTwoToneIcon className={classes.plusIcon} />
                {"Add Invoice No"}
              </Button>
            </Grid>
            <Grid item>
              <ReactToPrint
                trigger={() => (
                  <Button
                    id="btn-create-invoice"
                    variant="contained"
                    onClick={handlePrintInvoice}
                  >
                    <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                    {"Print Invoice"}
                  </Button>
                )}
                content={() => componentRef.current}
                documentTitle={`Invoice ${invoiceNo}`}
              />
              <div style={{ display: "none" }}>
                <InvoicePrinter
                  ref={componentRef}
                  invoiceNo={invoiceNo}
                  amount={list}
                ></InvoicePrinter>
              </div>
            </Grid>
          </Grid>
        }
      >
        <Grid item container className={classes.infoContainer}>
          <Grid item className={classes.totalAmount}>
            {`Total : ${list.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </Grid>
          <Grid item className={classes.totalAmount}>
            {`Invoice No : ${invoiceNo}`}
          </Grid>
        </Grid>
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
              label="PO NUMBER"
              id="requestNum"
              name="requestNum"
              placeholder="Select PO Number"
              onChange={(value) => setRequestNumber(value)}
              value={requestNumber}
              items={filteredPOList}
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
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="INVOICE NO"
              id="invoiceNo"
              name="invoice"
              placeholder="SELECT INVOICE NO"
              onChange={(value) => setSearchInvoiceNo(value)}
              value={searchInvoiceNo}
              items={filteredInvoiceList}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.section} xs={12}>
          {invoiceData && (
            <LazyLoadingTable
              columns={columns}
              data={invoiceData}
              InfiniteScroll={false}
              hiddenColumns={["id", "itemColor", "itemName", "poDate"]}
              maxHeightInRows={15}
              customProps={{ height: "420px" }}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
            />
          )}
        </Grid>
      </PageLayout>
      <AlertDialogBox
        open={openInvoiceDialog}
        handleClose={handleCloseDialogBox}
        buttonCancelText="Cancel"
        title="ADD INVOICE NO"
        content={
          <>
            <Grid item className={classes.textField}>
              <Grid item>
                <FormControl fullWidth>
                  <LabeledTextField
                    id="invoiceNo"
                    name="invoiceNo"
                    placeholder="Invoice No"
                    onChange={(value) => setInvoiceNo(value)}
                    value={invoiceNo}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </>
        }
        handleOk={handleSaveInvoiceNo}
        buttonConfirmText={"OK"}
        icon={
          <CheckCircleOutlineIcon
            style={{
              alignSelf: "center",
              width: "42px",
              height: "42px",
              position: "absolute",
              marginTop: "25px",
              color: "#FF7C7C",
            }}
          />
        }
      />
      {openManageInvoiceDialogBox && (
        <ManageInvoice
          openManageInvoiceDialogBox={openManageInvoiceDialogBox}
          setOpenManageInvoiceDialogBox={setOpenManageInvoiceDialogBox}
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
        />
      )}
    </Grid>
  );
};
export default ListInvoice;
