import React, { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { Grid, FormControl, Button } from "@mui/material";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import LabeledTextField from "../../../components/LabeledTextField";

import { styles } from "./styles";
import ManageRawMaterialStockOptionalPanel from "./ManageRawMaterialStockOptionalPanel.js";

import { sumConsumptionBreakdown } from "../helper";

import useCreateRawMaterialStockEntry from "../../../hooks/services/useCreateRawMaterialStockEntry";
import useUpdateRawMaterialStockEntryById from "../../../hooks/services/useUpdateRawMaterialStockEntryById";

const shiftOptions = [
  { name: "Morning", value: "Morning" },
  { name: "Afternoon", value: "Afternoon" },
  { name: "Night", value: "Night" },
];

// Daily stock entry: opening is auto-pulled (never re-entered), consumed is
// built up from machine/mold/shift breakdown rows, closing is calculated.
const ManageRawMaterialStock = ({
  openEntryDialogBox,
  setOpenEntryDialogBox,
  selectedMaterial,
  selectedDate,
  selectedEntry,
  setSelectedEntry,
}) => {
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();

  const [consumption, setConsumption] = useState(
    selectedEntry?.consumption ? [...selectedEntry.consumption] : []
  );

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, { variant: snackerVariant, autoHideDuration: 3000 });
  };

  const { mutateAsync: createEntry } = useCreateRawMaterialStockEntry();
  const { mutateAsync: updateEntryById } = useUpdateRawMaterialStockEntryById({
    id: selectedEntry?.id,
  });

  const closeDialog = () => {
    setSelectedEntry();
    setOpenEntryDialogBox(false);
  };

  const formik = useFormik({
    initialValues: {
      machine: "",
      mold: "",
      shift: "",
      quantity: "",
      received: selectedEntry?.received ?? "",
    },
    onSubmit: () => {},
  });

  const opening = selectedEntry?.opening ?? selectedMaterial?.previousClosing ?? 0;
  const received = Number(formik.values.received) || 0;
  const consumed = sumConsumptionBreakdown(consumption);
  const closing = Number(opening) + received - consumed;

  const handleAddConsumptionRow = () => {
    if (!formik.values.machine || !formik.values.quantity) {
      return;
    }
    setConsumption([
      ...consumption,
      {
        machine: formik.values.machine,
        mold: formik.values.mold,
        shift: formik.values.shift,
        quantity: formik.values.quantity,
      },
    ]);
    formik.setFieldValue("machine", "");
    formik.setFieldValue("mold", "");
    formik.setFieldValue("shift", "");
    formik.setFieldValue("quantity", "");
  };

  const submitEntry = async (submitted) => {
    try {
      const payload = {
        materialId: selectedMaterial?.id,
        date: selectedDate,
        opening,
        received,
        consumed,
        closing,
        consumption,
        submitted,
      };
      if (selectedEntry) {
        await updateEntryById(payload);
      } else {
        await createEntry(payload);
      }
      setEnqueueSnackbar(
        submitted ? "Stock Entry Submitted & Locked" : "Draft Saved",
        "success"
      );
      closeDialog();
    } catch (e) {
      setEnqueueSnackbar("Error Occurred while saving Stock Entry", "error");
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Machine",
      accessor: "machine",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Mold",
      accessor: "mold",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Shift",
      accessor: "shift",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Quantity",
      accessor: "quantity",
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
      }) => (
        <ManageRawMaterialStockOptionalPanel
          values={values}
          consumption={consumption}
          setConsumption={setConsumption}
        />
      ),
    },
  ];

  const isLocked = selectedEntry?.submitted;

  return (
    <DialogBox
      title={`${selectedMaterial?.name} — ${selectedDate}`}
      open={openEntryDialogBox}
      setOpen={closeDialog}
      maxWidth="md"
      height="700px"
      backButtonTitle={!isLocked ? "Save Draft" : undefined}
      handleBackButton={() => submitEntry(false)}
      saveButtonTitle={!isLocked ? "Submit & Lock" : undefined}
      handleSaveButton={() => submitEntry(true)}
      children={
        <Grid
          container
          classes={{ container: classes.container }}
          spacing={2}
        >
          <Grid item xs={4}>
            <span>Opening Stock (auto-pulled)</span>
            <div className={classes.readOnlyValue}>{opening}</div>
          </Grid>
          <Grid item xs={4} className={classes.textField}>
            <FormControl fullWidth>
              <LabeledTextField
                id="received"
                name="received"
                label="Received (GRN/Purchase)"
                type="number"
                disabled={isLocked}
                onChange={(value) => formik.setFieldValue("received", value)}
                value={formik.values.received}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <span>Closing Stock (calculated)</span>
            <div className={classes.readOnlyValue}>{closing}</div>
          </Grid>

          {!isLocked && (
            <>
              <Grid item xs={12}>
                <b>Consumption breakdown (machine / mold / shift)</b>
              </Grid>
              <Grid item xs={3} className={classes.textField}>
                <FormControl fullWidth>
                  <LabeledTextField
                    id="machine"
                    name="machine"
                    label="Machine"
                    placeholder="Machine No."
                    onChange={(value) => formik.setFieldValue("machine", value)}
                    value={formik.values.machine}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} className={classes.textField}>
                <FormControl fullWidth>
                  <LabeledTextField
                    id="mold"
                    name="mold"
                    label="Mold"
                    placeholder="Mold No."
                    onChange={(value) => formik.setFieldValue("mold", value)}
                    value={formik.values.mold}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} className={classes.textField}>
                <FormControl fullWidth>
                  <LabelledEditableSelect
                    id="shift"
                    name="shift"
                    label="Shift"
                    placeholder="Select Shift"
                    onChange={(value) => formik.setFieldValue("shift", value)}
                    value={formik.values.shift}
                    items={shiftOptions}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} className={classes.textField}>
                <FormControl fullWidth>
                  <LabeledTextField
                    id="quantity"
                    name="quantity"
                    label="Quantity Consumed"
                    type="number"
                    onChange={(value) => formik.setFieldValue("quantity", value)}
                    value={formik.values.quantity}
                  />
                </FormControl>
              </Grid>
              <Grid item container className={classes.section}>
                <Button
                  id="btn-add-consumption-row"
                  className={classes.itemSaveBtn}
                  variant="contained"
                  onClick={handleAddConsumptionRow}
                >
                  Add Consumption Row
                </Button>
              </Grid>
            </>
          )}

          {consumption && consumption.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={consumption}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={() => {}}
                customProps={{ height: 260 }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            Total Consumed: <b>{consumed}</b>
          </Grid>
        </Grid>
      }
    />
  );
};

export default ManageRawMaterialStock;
