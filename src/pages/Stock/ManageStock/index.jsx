import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";
import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import LabeledTextField from "../../../components/LabeledTextField";

import ManageStockOptionalPanel from "./ManageStockOptionalPanel.js";

import useUpdateStock from "../../../hooks/services/useUpdateStock.js";
import useUpdateStockById from "../../../hooks/services/useUpdateStockById.js";

const ManageStock = ({
  setOpenStockDialogBox,
  openStockDialogBox,
  itemColorsArray,
  itemNamesArray,
  selectedStock,
  setSelectedStock,
}) => {
  const classes = styles();
  const [stock, setStock] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: updateStock } = useUpdateStock();
  const { mutateAsync: updateStockById } = useUpdateStockById({
    id: selectedStock?.id,
  });

  const formik = useFormik({
    initialValues: {
      itemName: selectedStock?.itemName || "",
      itemColor: selectedStock?.itemColor || "",
      quantity: selectedStock?.quantity || "",
    },

    onSubmit: async () => {
      try {
        const groupedItems = new Map();
        stock.forEach((item) => {
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
        if(selectedStock){
          const stock = {
            itemName: formik.values.itemName,
            itemColor: formik.values.itemColor,
            quantity: formik.values.quantity,
          };
          await updateStockById(stock);
          setOpenStockDialogBox(false);
          setSelectedStock(null)
        }else{
          await updateStock(outputArray);
        }
        formik.resetForm();
        setStock([]);
        setEnqueueSnackbar("Stock Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar(
          "Error Occured during Stock Submission",
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
    setStock([...stock, itemObj]);
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
  };

  const closeDialog = () => {
    setSelectedStock();
    setOpenStockDialogBox(false);
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
          <ManageStockOptionalPanel
            values={values}
            setStock={setStock}
            stock={stock}
          />
        );
      },
    },
  ];

  return (
    <>
      <DialogBox
        title={selectedStock ? "Update Stock" : "Add Stock"}
        open={openStockDialogBox}
        setOpen={closeDialog}
        maxWidth={selectedStock ? "sm" : "lg"}
        height={selectedStock ? "600px" : "1200px"}
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
                {!selectedStock && stock && (
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
                )}
                {!selectedStock && stock && (
                  <>
                    <Grid item className={classes.listTable} xs={12}>
                      <LazyLoadingTable
                        columns={columns}
                        data={stock}
                        hiddenColumns={["id"]}
                        maxHeightInRows={15}
                        onClickTableRow={(index, row) => {
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
                    {selectedStock ? "Update" : "Add Stock"}
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
export default ManageStock;
