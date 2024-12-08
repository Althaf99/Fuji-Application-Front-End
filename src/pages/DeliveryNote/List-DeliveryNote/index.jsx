import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

import OptionPanel from "./deliveryNoteOptionalPanel.js";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid, FormControl } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import { DeliveryNotePrinter } from "../../../components/Printers/DeliveryNotePrinter/index.jsx";
import CustomSelectDateRange from "../../../components/CustomSelectDateRange/index.jsx";

import ManageDeliveryNote from "../ManageDeliveryNote";

import { formatDate } from "./helper.js";

import useDeliveryNote from "../../../hooks/services/useDeliveryNote";

import { UserContext } from "../../../components/UserContext/index.jsx";

const ListDeliveryNote = () => {
  const classes = styles();
  const componentRef = useRef();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState();

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  const [openDeliveryNoteDialogBox, setOpenDeliveryNoteDialogBox] =
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

  const { data: deliverNoteData } = useDeliveryNote({
    itemName: itemName,
    itemColor: itemColor,
    startDate: startDate ? formatDate(startDate) : null,
    endDate: endDate ? formatDate(endDate) : null,
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
      Header: "Delivery Date",
      accessor: "deliveryDate",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
    },
    {
      Header: "Description",
      accessor: "description",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
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
            setOpenDeliveryNoteDialogBox={setOpenDeliveryNoteDialogBox}
            setSelectedDelivery={setSelectedDelivery}
          />
        );
      },
    },
  ];

  const handleCreateDeliveryNote = () => {
    setOpenDeliveryNoteDialogBox(true);
  };

  const handlePrintDeliveryNote = () => {
    navigate(`/deliveryNotePrinter`, {
      state: { deliveryNoteDate: formatDate(startDate) },
    });
  };

  const onChange = (update) => {
    setDateRange(update);
  };

  let no = 0;
  deliverNoteData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Delivery Note"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-create-Delivery-Note"
                variant="contained"
                onClick={handleCreateDeliveryNote}
              >
                <AddCircleOutlineIcon className={classes.plusIcon} />
                {"Create Delivery Note"}
              </Button>
            </Grid>
            <Grid item>
              <ReactToPrint
                trigger={() => (
                  <Button
                    id="btn-create-invoice"
                    variant="contained"
                    onClick={handlePrintDeliveryNote}
                  >
                    <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                    {"Print DeliveryNote"}
                  </Button>
                )}
                content={() => componentRef.current}
                documentTitle={`DeliveryNote ${formatDate(startDate)}`}
              />
              <div style={{ display: "none" }}>
                <DeliveryNotePrinter
                  ref={componentRef}
                  startDate={startDate}
                  endDate={endDate}
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

        <Grid item className={classes.section} xs={12}>
          {deliverNoteData && (
            <LazyLoadingTable
              columns={columns}
              hasNextPage={false}
              data={deliverNoteData}
              hiddenColumns={["id", "description", "itemName", "itemColor"]}
              maxHeightInRows={15}
              customProps={{ height: "565px" }}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
            />
          )}
        </Grid>
      </PageLayout>
      {openDeliveryNoteDialogBox === true && (
        <ManageDeliveryNote
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          openDeliveryNoteDialogBox={openDeliveryNoteDialogBox}
          setOpenDeliveryNoteDialogBox={setOpenDeliveryNoteDialogBox}
          selectedDelivery={selectedDelivery}
          setSelectedDelivery={setSelectedDelivery}
        />
      )}
    </Grid>
  );
};
export default ListDeliveryNote;
