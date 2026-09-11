import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import CustomDatePicker from "../../../components/CustomDatePicker";
import ReorderAlertBanner from "../../../components/ReorderAlertBanner";

import { styles } from "./styles";
import RawMaterialStockOptionalPanel from "./RawMaterialStockOptionalPanel.js";
import ManageRawMaterialStock from "../ManageRawMaterialStock";
import GRNEntry from "../GRNEntry";
import AuditTrail from "../AuditTrail";

import {
  formatDate,
  computeAverageConsumption,
  computeDaysCover,
  getAlertLevel,
} from "../helper";

import useRawMaterials from "../../../hooks/services/useRawMaterials";
import useRawMaterialStock from "../../../hooks/services/useRawMaterialStock";

const TRAILING_WINDOW_DAYS = 30;

const ListRawMaterialStock = () => {
  const classes = styles();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [selectedEntry, setSelectedEntry] = useState();
  const [openEntryDialogBox, setOpenEntryDialogBox] = useState(false);
  const [openGRNDialogBox, setOpenGRNDialogBox] = useState(false);
  const [openAuditDialogBox, setOpenAuditDialogBox] = useState(false);
  const [auditEntryId, setAuditEntryId] = useState();

  const { data: materialsData } = useRawMaterials();

  const trailingStartDate = new Date(selectedDate);
  trailingStartDate.setDate(trailingStartDate.getDate() - TRAILING_WINDOW_DAYS);

  const { data: todayEntries } = useRawMaterialStock({
    date: formatDate(selectedDate),
  });
  const { data: trailingEntries } = useRawMaterialStock({
    startDate: formatDate(trailingStartDate),
    endDate: formatDate(selectedDate),
  });

  const materialsArray =
    materialsData?.map((material) => ({
      name: material.name,
      value: material.id,
    })) || [];

  // Build one row per material: today's entry (if any) + the reorder rule engine result.
  const rows =
    materialsData?.map((material) => {
      const entry = todayEntries?.find(
        (item) => item.materialId === material.id
      );
      const materialTrailingEntries = trailingEntries?.filter(
        (item) => item.materialId === material.id
      );
      const averageDailyConsumption = computeAverageConsumption(
        materialTrailingEntries
      );
      const closing = entry?.closing ?? null;
      const daysCover = computeDaysCover(closing, averageDailyConsumption);
      const alertLevel = getAlertLevel(daysCover);

      return {
        id: material.id,
        materialId: material.id,
        materialName: material.name,
        category: material.category,
        unit: material.unit,
        opening: entry?.opening ?? material.previousClosing ?? 0,
        received: entry?.received ?? "-",
        consumed: entry?.consumed ?? "-",
        closing: closing ?? "-",
        daysCover,
        alertLevel,
        submitted: entry?.submitted ?? false,
        entryId: entry?.id,
      };
    }) || [];

  const alerts = rows.map((row) => ({
    materialId: row.materialId,
    materialName: row.materialName,
    daysCover: row.daysCover,
    alertLevel: row.alertLevel,
  }));

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Material Id", accessor: "materialId" },
    { Header: "Entry Id", accessor: "entryId" },
    { Header: "Submitted", accessor: "submitted" },
    { Header: "Alert Level", accessor: "alertLevel" },
    {
      Header: "Material",
      accessor: "materialName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "18%",
    },
    {
      Header: "Category",
      accessor: "category",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "12%",
    },
    {
      Header: "Opening",
      accessor: "opening",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Received",
      accessor: "received",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Consumed",
      accessor: "consumed",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Closing",
      accessor: "closing",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
    },
    {
      Header: "Days Cover",
      accessor: "daysCover",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "10%",
      Cell: ({ value }) => <>{value !== null ? value.toFixed(1) : "-"}</>,
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
      }) => (
        <RawMaterialStockOptionalPanel
          values={values}
          setOpenEntryDialogBox={setOpenEntryDialogBox}
          setSelectedEntry={setSelectedEntry}
          setSelectedMaterial={setSelectedMaterial}
          setOpenAuditDialogBox={setOpenAuditDialogBox}
          setAuditEntryId={setAuditEntryId}
        />
      ),
    },
  ];

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Raw Material Stock — Daily Entry"}
        pageActions={
          <Grid item container spacing={2}>
            <Grid item>
              <Button
                id="btn-materials-master"
                variant="outlined"
                onClick={() => navigate("/rawMaterialStock/materials")}
              >
                <CategoryOutlinedIcon className={classes.plusIcon} />
                {"Materials Master"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                id="btn-view-reports"
                variant="outlined"
                onClick={() => navigate("/rawMaterialStock/reports")}
              >
                <AssessmentOutlinedIcon className={classes.plusIcon} />
                {"Reports"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                id="btn-new-grn"
                variant="contained"
                onClick={() => setOpenGRNDialogBox(true)}
              >
                <AddCircleOutlineIcon className={classes.plusIcon} />
                {"New GRN"}
              </Button>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={3} className={classes.section}>
            <span>DATE</span>
            <CustomDatePicker
              date={selectedDate}
              handleDateSelect={(date) => setSelectedDate(date || new Date())}
            />
          </Grid>
        </Grid>

        <ReorderAlertBanner alerts={alerts} />

        <Grid item className={classes.section} xs={12}>
          {materialsData && (
            <LazyLoadingTable
              columns={columns}
              hasNextPage={false}
              data={rows}
              hiddenColumns={["id", "materialId", "entryId", "submitted", "alertLevel"]}
              maxHeightInRows={15}
              customProps={{ height: "565px" }}
              onClickTableRow={() => {}}
            />
          )}
        </Grid>
      </PageLayout>

      {openEntryDialogBox === true && (
        <ManageRawMaterialStock
          openEntryDialogBox={openEntryDialogBox}
          setOpenEntryDialogBox={setOpenEntryDialogBox}
          selectedMaterial={selectedMaterial}
          selectedDate={formatDate(selectedDate)}
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}
      {openGRNDialogBox === true && (
        <GRNEntry
          open={openGRNDialogBox}
          setOpen={setOpenGRNDialogBox}
          materialsArray={materialsArray}
        />
      )}
      {openAuditDialogBox === true && (
        <AuditTrail
          open={openAuditDialogBox}
          setOpen={setOpenAuditDialogBox}
          stockEntryId={auditEntryId}
        />
      )}
    </Grid>
  );
};
export default ListRawMaterialStock;

