import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import LabeledTextField from "../../../components/LabeledTextField";

import ManageDeliveryNoteOptionalPanel from "./ManageDeliveryNoteOptionalPanel.js";

import useUpdateStock from "../../../hooks/services/useUpdateStock.js";

const ManageDeliveryNote = ({
  setOpenDeliveryNoteDialogBox,
  openDeliveryNoteDialogBox,
  itemColorsArray,
  itemNamesArray,
  selectedDelivery,
  setSelectedDelivery,
}) => {
  const classes = styles();
  const [openItem, setOpenItem] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: updateStock } = useUpdateStock();

  const formik = useFormik({
    initialValues: {
      itemName: selectedDelivery?.itemName || "",
      itemColor: selectedDelivery?.itemColor || "",
      quantity: selectedDelivery?.quantity || "",
    },

    onSubmit: async () => {
      try {
        const groupedItems = new Map();
        deliveryNote.forEach((item) => {
          const key = `${item.itemName}-${item.itemColor}`;
          if (!groupedItems.has(key)) {
            groupedItems.set(key, {
              itemName: item.itemName,
              item: [],
            });
          }
          groupedItems.get(key).item.push({
            itemColor: item.itemColor,
            quantity: item.quantity,
          });
        });
        const outputArray = Array.from(groupedItems.values());
        await updateStock(outputArray);
        formik.resetForm();
        setDeliveryNote([]);
        setEnqueueSnackbar("Delivery Note Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar(
          "Error Occured during Delivery Note Submission",
          "error"
        );
      }
    },
  });

  const handleSaveItem = () => {
    const values = formik.values;
    const itemObj = {
      itemColor: values.itemColor,
      quantity: values.quantity,
      itemName: values.itemName,
    };
    setDeliveryNote([...deliveryNote, itemObj]);
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
  };

  const handleOpenItemColorDialogBox = () => {
    setOpenItem(true);
  };

  const closeDialog = () => {
    setSelectedDelivery();
    setOpenDeliveryNoteDialogBox(false);
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Color",
      accessor: "itemColor",
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
      }) => {
        return (
          <ManageDeliveryNoteOptionalPanel
            values={values}
            setDeliveryNote={setDeliveryNote}
            deliveryNote={deliveryNote}
          />
        );
      },
    },
  ];

  return (
    <>
      <DialogBox
        title={selectedDelivery ? "Update Stock" : "Create Stock"}
        open={openDeliveryNoteDialogBox}
        setOpen={closeDialog}
        maxWidth={selectedDelivery ? "sm" : "lg"}
        height={selectedDelivery ? "600px" : "1200px"}
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
                          label="Total Quantity"
                          placeholder="Total Quantity"
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
                  <Button
                    id="btn-general-info-next"
                    className={classes.itemSaveBtn}
                    variant="contained"
                    onClick={handleSaveItem}
                    disbaled={formik.isSubmitting}
                  >
                    Add Item To Stock
                  </Button>
                </Grid>
                {!selectedDelivery && deliveryNote && (
                  <>
                    <Grid item className={classes.listTable} xs={12}>
                      <LazyLoadingTable
                        columns={columns}
                        data={deliveryNote}
                        hiddenColumns={["id"]}
                        maxHeightInRows={15}
                        onClickTableRow={(index, row) => {
                          console.log(index, row);
                        }}
                        customProps={{ height: 390 }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disbaled={formik.isSubmitting}
                  >
                    {selectedDelivery ? "Update" : "Create"}
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
export default ManageDeliveryNote;
