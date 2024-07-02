import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";
import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import CustomDatePicker from "../../../components/CustomDatePicker";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import LabeledTextField from "../../../components/LabeledTextField";

import { formatDate, reverseFormatDate } from "./helper.js";

import useUpdateInvoice from "../../../hooks/services/useUpdateInvoice.js";

const ManageInvoice = ({
  setOpenManageInvoiceDialogBox,
  openManageInvoiceDialogBox,
  itemColorsArray,
  itemNamesArray,
  selectedInvoice,
  setSelectedInvoice,
}) => {
  const classes = styles();
  const [date, setDate] = useState(
    new Date(reverseFormatDate(selectedInvoice?.invoiceDate))
  );

  const [poDate, setPoDate] = useState(
    new Date(reverseFormatDate(selectedInvoice?.poDate))
  );

  console.log("selectedInvoice", selectedInvoice);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: updateInvoice } = useUpdateInvoice({
    id: selectedInvoice?.id,
  });

  const formik = useFormik({
    initialValues: {
      invoiceDate: reverseFormatDate(selectedInvoice?.invoiceDate) || "",
      poDate: reverseFormatDate(selectedInvoice?.poDate) || "",
      itemName: selectedInvoice?.itemName || "",
      itemColor: selectedInvoice?.itemColor || "",
      quantity: selectedInvoice?.quantity || "",
      amount: selectedInvoice?.amount || "",
      unitPrice: selectedInvoice?.unitPrice || "",
      po: selectedInvoice?.po || "",
    },

    onSubmit: async () => {
      try {
        const Invoice = {
          invoiceDate: formatDate(date),
          poDate: formatDate(poDate),
          po: formik.values.po,
          itemName: formik.values.itemName,
          itemColor: formik.values.itemColor,
          quantity: formik.values.quantity,
          amount: formik.values.amount,
          unitPrice: formik.values.unitPrice,
        };
        await updateInvoice(Invoice);
        formik.resetForm();
        setEnqueueSnackbar("Invoice Note Updated Succesfully", "success");
        setOpenManageInvoiceDialogBox(false);
      } catch (e) {
        setEnqueueSnackbar(
          "Error Occured during Invoice Note Submission",
          "error"
        );
      }
    },
  });

  const closeDialog = () => {
    setOpenManageInvoiceDialogBox(false);
    setSelectedInvoice();
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  const handlePoDateSelect = (date) => {
    setPoDate(poDate);
  };
  return (
    <>
      <DialogBox
        title={"Update Invoice Note"}
        open={openManageInvoiceDialogBox}
        setOpen={closeDialog}
        maxWidth="sm"
        height="1200px"
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
                <Grid item container className={classes.section} spacing={3}>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Grid className={classes.label}>SELECT PO DATE</Grid>
                        <CustomDatePicker
                          handleDateSelect={handlePoDateSelect}
                          date={poDate}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Grid className={classes.label}>
                          SELECT INVOICE DATE
                        </Grid>
                        <CustomDatePicker
                          handleDateSelect={handleDateSelect}
                          date={date}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="po"
                          name="po"
                          label="PO Number"
                          placeholder="Enter PO Number"
                          onChange={(value) =>
                            formik.setFieldValue("po", value)
                          }
                          value={formik.values.po}
                          items={itemNamesArray}
                        />
                      </FormControl>
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
                  <Grid item container className={classes.section} spacing={3}>
                    <Grid item className={classes.textField}>
                      <Grid item>
                        <FormControl fullWidth>
                          <LabeledTextField
                            id="unitPrice"
                            name="unitPrice"
                            label="Unit Price"
                            placeholder="Unit Price"
                            onChange={(value) =>
                              formik.setFieldValue("unitPrice", value)
                            }
                            value={formik.values.unitPrice}
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
                            id="amount"
                            name="amount"
                            label="Amount"
                            placeholder="Amount"
                            onChange={(value) =>
                              formik.setFieldValue("amount", value)
                            }
                            value={formik.values.amount}
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
export default ManageInvoice;
