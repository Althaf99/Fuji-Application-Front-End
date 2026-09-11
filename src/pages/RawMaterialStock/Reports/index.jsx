import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";

import { Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomSelectDateRange from "../../../components/CustomSelectDateRange";

import { styles } from "./styles";
import { formatDate } from "../helper";

import useRawMaterials from "../../../hooks/services/useRawMaterials";
import useRawMaterialStock from "../../../hooks/services/useRawMaterialStock";

// History & Reports: filter by material/date range, spot consumption-trend
// drift (e.g. dosage creeping up), and export the filtered data to Excel.
const Reports = () => {
  const classes = styles();
  const navigate = useNavigate();

  const [materialId, setMaterialId] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { data: materialsData } = useRawMaterials();
  const materialsArray =
    materialsData?.map((material) => ({
      name: material.name,
      value: material.id,
    })) || [];

  const { data: historyData } = useRawMaterialStock({
    materialId,
    startDate: startDate ? formatDate(startDate) : undefined,
    endDate: endDate ? formatDate(endDate) : undefined,
  });

  const handleExportToExcel = async () => {
    if (!historyData || historyData.length === 0) {
      return;
    }
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(historyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Raw Material Stock");
    XLSX.writeFile(workbook, `RawMaterialStock_${formatDate(new Date())}.xlsx`);
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Date",
      accessor: "date",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Material",
      accessor: "materialName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Opening",
      accessor: "opening",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Received",
      accessor: "received",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Consumed",
      accessor: "consumed",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Closing",
      accessor: "closing",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Entered By",
      accessor: "enteredBy",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
  ];

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Raw Material Stock — History & Reports"}
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
                id="btn-export-excel"
                variant="contained"
                onClick={handleExportToExcel}
              >
                <FileDownloadIcon className={classes.plusIcon} />
                {"Export to Excel"}
              </Button>
            </Grid>
          </Grid>
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={3} className={classes.section}>
            <LabelledEditableSelect
              label="MATERIAL"
              id="materialId"
              name="materialId"
              placeholder="Select Material"
              onChange={(value) => setMaterialId(value)}
              value={materialId}
              items={materialsArray}
            />
          </Grid>
          <Grid item xs={3} className={classes.section}>
            <CustomSelectDateRange
              onChange={(range) => setDateRange(range)}
              startDate={startDate}
              endDate={endDate}
            />
          </Grid>
        </Grid>

        {historyData && historyData.length > 0 && (
          <Grid item xs={12} className={classes.chartSection}>
            <LineChart
              dataset={historyData}
              xAxis={[{ scaleType: "band", dataKey: "date" }]}
              series={[
                { dataKey: "consumed", label: "Consumed" },
                { dataKey: "closing", label: "Closing Stock" },
              ]}
              colors={["#FF004D", "#0F5EF7"]}
              margin={{ left: 60, right: 60 }}
              width={900}
              height={350}
            />
          </Grid>
        )}

        <Grid item className={classes.section} xs={12}>
          {historyData && (
            <LazyLoadingTable
              columns={columns}
              hasNextPage={false}
              data={historyData}
              hiddenColumns={["id"]}
              maxHeightInRows={15}
              customProps={{ height: "500px" }}
              onClickTableRow={() => {}}
            />
          )}
        </Grid>
      </PageLayout>
    </Grid>
  );
};

export default Reports;
