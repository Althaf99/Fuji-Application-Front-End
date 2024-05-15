import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";
import { useSnackbar } from "notistack";

import { styles } from "../../Invoice/ManageInvoice/styles.js";

import DialogBox from "../../../components/DialogBox";
import CustomDatePicker from "../../../components/CustomDatePicker";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import LabeledTextField from "../../../components/LabeledTextField";

import {
  formatDate,
  reverseFormatDate,
} from "../../Invoice/ManageInvoice/helper.js";

import useUpdateExcess from "../../../hooks/services/useUpdateExcess.js";

const ManageExcess = ({
  setOpenManageExcessDialogBox,
  openManageExcessDialogBox,
  itemColorsArray,
  itemNamesArray,
  selectedExcess,
  setSelectedExcess,
}) => {
  console.log("selectedExcess", selectedExcess);
  const classes = styles();
  const [date, setDate] = useState(
    new Date(reverseFormatDate(selectedExcess?.excessDeliveredDate))
  );

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: updateExcess } = useUpdateExcess({
    id: selectedExcess?.id,
  });

  const formik = useFormik({
    initialValues: {
      excessDeliveredDate:
        reverseFormatDate(selectedExcess?.excessDeliveredDate) || "",
      itemName: selectedExcess?.itemName || "",
      itemColor: selectedExcess?.itemColor || "",
      quantity: selectedExcess?.quantity || "",
    },

    onSubmit: async () => {
      try {
        const excess = {
          excessDeliveredDate: formatDate(date),
          itemName: formik.values.itemName,
          itemColor: formik.values.itemColor,
          quantity: formik.values.quantity,
        };
        await updateExcess(excess);
        formik.resetForm();
        setEnqueueSnackbar("Excess Updated Succesfully", "success");
        setOpenManageExcessDialogBox(false);
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Excess Update", "error");
      }
    },
  });

  const closeDialog = () => {
    setOpenManageExcessDialogBox(false);
    setSelectedExcess();
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Update Excess"}
        open={openManageExcessDialogBox}
        setOpen={closeDialog}
        maxWidth="sm"
        height="500px"
        children={
          <Grid
            container
            classes={{ container: classes.container }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <Grid className={classes.label}>SELECT DATE</Grid>
                      <CustomDatePicker
                        handleDateSelect={handleDateSelect}
                        date={date}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="itemName"
                          name="itemName"
                          label="Item Name"
                          placeholder="Enter Item Name"
                          onChange={(value) =>
                            formik.setFieldValue("itemName", value)
                          }
                          value={formik.values.itemName}
                          items={itemNamesArray}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sx={classes.textField}>
                  <Grid item container className={classes.section} spacing={3}>
                    <Grid item className={classes.textField}>
                      <Grid item>
                        <FormControl fullWidth>
                          <LabelledEditableSelect
                            id="itemColor"
                            name="itemColor"
                            label="Item Color"
                            placeholder="Enter Item Color"
                            onChange={(value) =>
                              formik.setFieldValue("itemColor", value)
                            }
                            value={formik.values.itemColor}
                            items={itemColorsArray}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container className={classes.section} spacing={3}>
                    <Grid item className={classes.textField}>
                      <Grid item>
                        <FormControl fullWidth>
                          <LabeledTextField
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            placeholder="Quantity"
                            onChange={(value) =>
                              formik.setFieldValue("quantity", value)
                            }
                            value={formik.values.quantity}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disbaled={formik.isSubmitting}
                  >
                    Update
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        }
      />
    </>
  );
};
export default ManageExcess;
