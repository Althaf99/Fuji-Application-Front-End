import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import { styles } from "./styles";
import MaterialsMasterOptionalPanel from "./MaterialsMasterOptionalPanel.js";
import ManageMaterial from "./ManageMaterial";

import useRawMaterials from "../../../hooks/services/useRawMaterials";

const categoryOptions = [
  { name: "Raw Material", value: "Raw Material" },
  { name: "Masterbatch", value: "Masterbatch" },
];

const MaterialsMaster = () => {
  const classes = styles();
  const navigate = useNavigate();

  const [category, setCategory] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [openMaterialDialogBox, setOpenMaterialDialogBox] = useState(false);

  const { data: materialsData } = useRawMaterials({ category });

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Code",
      accessor: "code",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Name",
      accessor: "name",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "20%",
    },
    {
      Header: "Category",
      accessor: "category",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
    },
    {
      Header: "Unit",
      accessor: "unit",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Reorder Level",
      accessor: "reorderLevel",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "12%",
    },
    {
      Header: "Reorder Qty",
      accessor: "reorderQuantity",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "12%",
    },
    {
      Header: "Dosage Ratio",
      accessor: "dosageRatio",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "12%",
      Cell: ({ value }) => <>{value ? value : "-"}</>,
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "15%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => (
        <MaterialsMasterOptionalPanel
          values={values}
          setOpenMaterialDialogBox={setOpenMaterialDialogBox}
          setSelectedMaterial={setSelectedMaterial}
        />
      ),
    },
  ];

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Materials Master"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-back-raw-material-stock"
                variant="outlined"
                onClick={() => navigate("/rawMaterialStock")}
              >
                <ArrowBackIcon className={classes.plusIcon} />
                {"Back"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                id="btn-create-material"
                variant="contained"
                onClick={() => setOpenMaterialDialogBox(true)}
              >
                <AddCircleOutlineIcon className={classes.plusIcon} />
                {"Add Material"}
              </Button>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={3} className={classes.section}>
            <LabelledEditableSelect
              label="CATEGORY"
              id="category"
              name="category"
              placeholder="Filter by Category"
              onChange={(value) => setCategory(value)}
              value={category}
              items={categoryOptions}
            />
          </Grid>
        </Grid>

        <Grid item className={classes.section} xs={12}>
          {materialsData && (
            <LazyLoadingTable
              columns={columns}
              hasNextPage={false}
              data={materialsData}
              hiddenColumns={["id"]}
              maxHeightInRows={15}
              customProps={{ height: "565px" }}
              onClickTableRow={() => {}}
            />
          )}
        </Grid>
      </PageLayout>
      {openMaterialDialogBox === true && (
        <ManageMaterial
          openMaterialDialogBox={openMaterialDialogBox}
          setOpenMaterialDialogBox={setOpenMaterialDialogBox}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
        />
      )}
    </Grid>
  );
};

export default MaterialsMaster;
