import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { Grid, FormControl } from "@mui/material";

import DialogBox from "../../../../components/DialogBox";
import LabelledEditableSelect from "../../../../components/LabelledEditableSelect";
import LabeledTextField from "../../../../components/LabeledTextField";

import { styles } from "./styles";

import useCreateRawMaterial from "../../../../hooks/services/useCreateRawMaterial";
import useUpdateRawMaterialById from "../../../../hooks/services/useUpdateRawMaterialById";

const categoryOptions = [
  { name: "Raw Material", value: "Raw Material" },
  { name: "Masterbatch", value: "Masterbatch" },
];

const ManageMaterial = ({
  openMaterialDialogBox,
  setOpenMaterialDialogBox,
  selectedMaterial,
  setSelectedMaterial,
}) => {
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, { variant: snackerVariant, autoHideDuration: 3000 });
  };

  const { mutateAsync: createRawMaterial } = useCreateRawMaterial();
  const { mutateAsync: updateRawMaterialById } = useUpdateRawMaterialById({
    id: selectedMaterial?.id,
  });

  const closeDialog = () => {
    setSelectedMaterial();
    setOpenMaterialDialogBox(false);
  };

  const formik = useFormik({
    initialValues: {
      code: selectedMaterial?.code || "",
      name: selectedMaterial?.name || "",
      category: selectedMaterial?.category || "",
      unit: selectedMaterial?.unit || "kg",
      reorderLevel: selectedMaterial?.reorderLevel || "",
      reorderQuantity: selectedMaterial?.reorderQuantity || "",
      dosageRatio: selectedMaterial?.dosageRatio || "",
    },
    onSubmit: async (values) => {
      try {
        if (selectedMaterial) {
          await updateRawMaterialById(values);
          setEnqueueSnackbar("Material Updated Successfully", "success");
        } else {
          await createRawMaterial(values);
          setEnqueueSnackbar("Material Added Successfully", "success");
        }
        closeDialog();
      } catch (e) {
        setEnqueueSnackbar("Error Occurred while saving Material", "error");
      }
    },
  });

  const isMasterbatch = formik.values.category === "Masterbatch";

  return (
    <DialogBox
      title={selectedMaterial ? "Update Material" : "Add Material"}
      open={openMaterialDialogBox}
      setOpen={closeDialog}
      maxWidth="sm"
      height="600px"
      children={
        <Grid
          container
          classes={{ container: classes.container }}
          spacing={1}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="code"
                      name="code"
                      label="Material Code"
                      placeholder="e.g. RM-001"
                      onChange={(value) => formik.setFieldValue("code", value)}
                      value={formik.values.code}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="name"
                      name="name"
                      label="Material Name"
                      placeholder="e.g. LDPE Resin"
                      onChange={(value) => formik.setFieldValue("name", value)}
                      value={formik.values.name}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabelledEditableSelect
                      id="category"
                      name="category"
                      label="Category"
                      placeholder="Select Category"
                      onChange={(value) =>
                        formik.setFieldValue("category", value)
                      }
                      value={formik.values.category}
                      items={categoryOptions}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="unit"
                      name="unit"
                      label="Unit"
                      placeholder="kg"
                      onChange={(value) => formik.setFieldValue("unit", value)}
                      value={formik.values.unit}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="reorderLevel"
                      name="reorderLevel"
                      label="Reorder Level"
                      type="number"
                      placeholder="Minimum stock before reordering"
                      onChange={(value) =>
                        formik.setFieldValue("reorderLevel", value)
                      }
                      value={formik.values.reorderLevel}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container className={classes.section} spacing={3}>
                <Grid item className={classes.textField} xs={12}>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="reorderQuantity"
                      name="reorderQuantity"
                      label="Reorder Quantity"
                      type="number"
                      placeholder="Quantity to order each time"
                      onChange={(value) =>
                        formik.setFieldValue("reorderQuantity", value)
                      }
                      value={formik.values.reorderQuantity}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {isMasterbatch && (
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField} xs={12}>
                    <FormControl fullWidth>
                      <LabeledTextField
                        id="dosageRatio"
                        name="dosageRatio"
                        label="Standard Dosage Ratio"
                        placeholder="e.g. 1:30"
                        onChange={(value) =>
                          formik.setFieldValue("dosageRatio", value)
                        }
                        value={formik.values.dosageRatio}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </form>
          </Grid>
        </Grid>
      }
      saveButtonTitle={selectedMaterial ? "Update" : "Add Material"}
      handleSaveButton={formik.handleSubmit}
      disableStatus={formik.isSubmitting}
    />
  );
};

export default ManageMaterial;
