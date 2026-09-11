import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { Grid, FormControl } from "@mui/material";

import DialogBox from "../../../components/DialogBox";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import LabeledTextField from "../../../components/LabeledTextField";
import CustomDatePicker from "../../../components/CustomDatePicker";

import { styles } from "./styles";
import { formatDate } from "../helper";

import useCreateRawMaterialGRN from "../../../hooks/services/useCreateRawMaterialGRN";

// Simple GRN/Purchase entry form. Feeds the "Received" figure on the daily
// stock entry instead of operators typing it directly into that table.
const GRNEntry = ({ open, setOpen, materialsArray }) => {
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, { variant: snackerVariant, autoHideDuration: 3000 });
  };

  const { mutateAsync: createGRN } = useCreateRawMaterialGRN();

  const closeDialog = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      materialId: "",
      supplier: "",
      invoiceNo: "",
      quantity: "",
      date: new Date(),
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createGRN({
          ...values,
          date: formatDate(values.date),
        });
        setEnqueueSnackbar("GRN Recorded Successfully", "success");
        resetForm();
        closeDialog();
      } catch (e) {
        setEnqueueSnackbar("Error Occurred while saving GRN", "error");
      }
    },
  });

  return (
    <DialogBox
      title="Goods Received Note (GRN)"
      open={open}
      setOpen={closeDialog}
      maxWidth="sm"
      height="500px"
      saveButtonTitle="Save GRN"
      handleSaveButton={formik.handleSubmit}
      disableStatus={formik.isSubmitting}
      children={
        <Grid container classes={{ container: classes.container }} spacing={2}>
          <Grid item xs={12} className={classes.textField}>
            <FormControl fullWidth>
              <LabelledEditableSelect
                id="materialId"
                name="materialId"
                label="Material"
                placeholder="Select Material"
                onChange={(value) => formik.setFieldValue("materialId", value)}
                value={formik.values.materialId}
                items={materialsArray}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <FormControl fullWidth>
              <LabeledTextField
                id="supplier"
                name="supplier"
                label="Supplier"
                placeholder="Supplier Name"
                onChange={(value) => formik.setFieldValue("supplier", value)}
                value={formik.values.supplier}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <FormControl fullWidth>
              <LabeledTextField
                id="invoiceNo"
                name="invoiceNo"
                label="Invoice / DO Number"
                placeholder="Invoice or Delivery Order No."
                onChange={(value) => formik.setFieldValue("invoiceNo", value)}
                value={formik.values.invoiceNo}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.textField}>
            <FormControl fullWidth>
              <LabeledTextField
                id="quantity"
                name="quantity"
                label="Quantity Received"
                type="number"
                onChange={(value) => formik.setFieldValue("quantity", value)}
                value={formik.values.quantity}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <span>Received Date</span>
            <CustomDatePicker
              date={formik.values.date}
              handleDateSelect={(date) => formik.setFieldValue("date", date)}
            />
          </Grid>
        </Grid>
      }
    />
  );
};

export default GRNEntry;
