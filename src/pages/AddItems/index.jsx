import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Grid } from "@material-ui/core";

import PageLayout from "../../components/PageLayout";
import TemplateTypeTile from "../../components/TemplateTypeTile/index.jsx";
import LazyLoadingTable from "../../components/LazyLoadingTable/index.js";
import ItemNameOptionalPanel from "./itemNameOptionalPanel.js";
import ItemColorOptionalPanel from "./itemColorOptionalPanel.js";
import PoNumberOptionalPanel from "./poNumberOptionalPanel.js";

import ItemName from "./itemName.jsx";
import ItemColor from "./itemColor.jsx";
import PoNumber from "./PoNumber.jsx";

import { styles } from "./styles.js";

import useItemNames from "../../hooks/services/useItemNames.js";
import useItemColors from "../../hooks/services/useItemColors.js";
import usePoNumbers from "../../hooks/services/usePoNumbers.js";

const AddItems = () => {
  const classes = styles();
  const [openItemName, setOpenItemName] = useState(false);
  const [openItemColor, setOpenItemColor] = useState(false);
  const [openPoNumber, setOpenPoNumber] = useState(false);

  const { data: itemNames } = useItemNames();
  const { data: itemColors } = useItemColors();
  const { data: poNumberList } = usePoNumbers();

  const itemNameColumns = [
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
      Header: "Item Name",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <ItemNameOptionalPanel values={values} />;
      },
    },
  ];

  let itemNameNo = 0;
  itemNames?.forEach((element) => {
    itemNameNo = itemNameNo + 1;
    element.no = itemNameNo;
  });

  const itemColorColumns = [
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
      Header: "Item Color",
      accessor: "itemColor",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <ItemColorOptionalPanel values={values} />;
      },
    },
  ];

  let itemColorNo = 0;
  itemColors?.forEach((element) => {
    itemColorNo = itemColorNo + 1;
    element.no = itemColorNo;
  });

  const poNumberColumns = [
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
      accessor: "requestNumber",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <PoNumberOptionalPanel values={values} />;
      },
    },
  ];

  let requestNumber = 0;
  poNumberList?.forEach((element) => {
    requestNumber = requestNumber + 1;
    element.no = requestNumber;
  });

  const handleClickItemNames = () => {
    setOpenItemName(true);
  };
  const handleClickItemColors = () => {
    setOpenItemColor(true);
  };

  const handleClickPONumbers = () => {
    setOpenPoNumber(true);
  };

  const formik = useFormik({
    initialValues: {
      itemColor: "",
      itemName: "",
      poNumber: "",
    },
  });

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout pageHeading={"AddItems"}>
        <Grid container spacing={2} className={classes.templateContainer}>
          <Grid item xs={4}>
            <TemplateTypeTile
              handleClick={handleClickItemNames}
              height={"60%"}
              templateTitle="Item Name"
              templateDescription="Click the tile add item name to the application"
              color={"#F05941"}
            />
          </Grid>
          <Grid item xs={4}>
            <TemplateTypeTile
              handleClick={handleClickItemColors}
              height={"60%"}
              templateTitle="Item Colors"
              templateDescription="Click the tile to add item colors to the application"
              color={"#FF9800"}
            />
          </Grid>
          <Grid item xs={4}>
            <TemplateTypeTile
              handleClick={handleClickPONumbers}
              height={"60%"}
              templateTitle="PO Numbers"
              templateDescription="Click the tile to add po numbers"
              color={"#BED754"}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.section} xs={4}>
          {itemNames && (
            <LazyLoadingTable
              columns={itemNameColumns}
              hasNextPage={false}
              data={itemNames}
              hiddenColumns={["id"]}
              maxHeightInRows={15}
              customProps={{ height: "440px" }}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
            />
          )}
        </Grid>
        <Grid item className={classes.section} xs={4}>
          {itemColors && (
            <LazyLoadingTable
              columns={itemColorColumns}
              hasNextPage={false}
              data={itemColors}
              hiddenColumns={["id"]}
              maxHeightInRows={15}
              customProps={{ height: "440px" }}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
            />
          )}
        </Grid>
        <Grid item className={classes.section} xs={4}>
          {poNumberList && (
            <LazyLoadingTable
              columns={poNumberColumns}
              hasNextPage={false}
              data={poNumberList}
              hiddenColumns={["id"]}
              maxHeightInRows={15}
              customProps={{ height: "440px" }}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
            />
          )}
        </Grid>
        <ItemName
          setOpenItemName={setOpenItemName}
          openItemName={openItemName}
          formik={formik}
          classes={classes}
        />
        <ItemColor
          setOpenItemColor={setOpenItemColor}
          openItemColor={openItemColor}
          formik={formik}
          classes={classes}
        />
        <PoNumber
          setOPenPo={setOpenPoNumber}
          openPo={openPoNumber}
          formik={formik}
          classes={classes}
        />
      </PageLayout>
    </Grid>
  );
};
export default AddItems;
