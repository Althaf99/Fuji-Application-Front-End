import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";
import LoupeRoundedIcon from "@mui/icons-material/LoupeRounded";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import CustomDatePicker from "../../../components/CustomDatePicker";
import LabeledTextField from "../../../components/LabeledTextField";

import Item from "./Item/item.jsx";

import { formatDate, reverseFormatDate } from "./helper.js";

import useCreateRequest from "../../../hooks/services/useCreateRequest";
import useUpdateRequest from "../../../hooks/services/useUpdateRequest.js";

import ManagePurchaseOrderOptionalPanel from "./managePurchaseOrderOptionalPanel.js";

const ManageRequest = ({
  setOpenPurchaseOrder,
  openPurchaseOrder,
  itemColorsArray,
  itemNamesArray,
  requestNumbersArray,
  selectedPurchaseOrder,
  setSelectedPurchaseOrder,
}) => {
  const classes = styles();
  const [item, setItem] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [request, setRequest] = useState([]);
  const [date, setDate] = useState(
    new Date(reverseFormatDate(selectedPurchaseOrder?.date))
  );

  const { mutateAsync: createRequest } = useCreateRequest();
  const { mutateAsync: updateRequest } = useUpdateRequest({
    id: selectedPurchaseOrder?.id,
  });

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const formik = useFormik({
    initialValues: {
      po: selectedPurchaseOrder ? selectedPurchaseOrder.po : "",
      poDate: selectedPurchaseOrder ? selectedPurchaseOrder.date : "",
      itemName: selectedPurchaseOrder ? selectedPurchaseOrder.itemName : "",
      itemColor: selectedPurchaseOrder ? selectedPurchaseOrder.itemColor : "",
      quantity: selectedPurchaseOrder ? selectedPurchaseOrder.quantity : "",
      unitPrice: selectedPurchaseOrder ? selectedPurchaseOrder.unitPrice : "",
    },

    onSubmit: async (values) => {
      try {
        const groupedItems = new Map();
        request.forEach((item) => {
          const key = `${item.itemName}-${item.itemColor}`;
          if (!groupedItems.has(key)) {
            groupedItems.set(key, {
              itemName: item.itemName,
              unitPrice: item.unitPrice,
              item: [],
            });
          }
          groupedItems.get(key).item.push({
            itemColor: item.itemColor,
            quantity: item.quantity,
          });
        });
        const outputArray = Array.from(groupedItems.values());
        const Request = {
          po: values.po,
          date: formatDate(date),
          items: outputArray,
        };
        if (!selectedPurchaseOrder) {
          await createRequest(Request);
          formik.resetForm();
          setItem([]);
          setRequest([]);
          setEnqueueSnackbar("Purchase Order Added Succesfully", "success");
          setOpenPurchaseOrder(false);
        } else {
          const purchaseOrder = {
            date: formatDate(date),
            itemName: formik.values.itemName,
            itemColor: formik.values.itemColor,
            quantity: formik.values.quantity,
            unitPrice: formik.values.unitPrice,
            po: formik.values.po,
          };
          await updateRequest(purchaseOrder);
          formik.resetForm();
          setEnqueueSnackbar("Purchase Order Update Succesfully", "success");
          setOpenPurchaseOrder(false);
        }
      } catch (e) {
        setEnqueueSnackbar(
          "Error Occured during Purchase Order Submission",
          "error"
        );
      }
    },
  });

  const handleSaveItem = () => {
    const values = formik.values;
    const obj = {
      itemColor: values.itemColor,
      quantity: values.quantity,
      itemName: values.itemName,
      unitPrice: values.unitPrice,
    };
    setRequest([...request, obj]);
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
  };

  const handleOpenItemColorDialogBox = () => {
    setOpenItem(true);
  };

  const closeDialog = () => {
    setSelectedPurchaseOrder();
    setOpenPurchaseOrder(false);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Item Name",
      accessor: "itemName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Item Color",
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
          <ManagePurchaseOrderOptionalPanel
            values={values}
            request={request}
            setRequest={setRequest}
          />
        );
      },
    },
  ];

  return (
    <>
      <DialogBox
        title={selectedPurchaseOrder ? "Update PO" : "Create PO"}
        open={openPurchaseOrder}
        setOpen={closeDialog}
        maxWidth={selectedPurchaseOrder ? "sm" : "lg"}
        height="900px"
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
                        <Grid className={classes.label}>SELECT DATE</Grid>
                        <CustomDatePicker
                          handleDateSelect={handleDateSelect}
                          date={date}
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
                          id="po"
                          name="po"
                          label="PO Number"
                          placeholder="Enter PO Number"
                          onChange={(value) =>
                            formik.setFieldValue("po", value)
                          }
                          value={formik.values.po}
                          items={requestNumbersArray}
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
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="unitPrice"
                          name="unitPrice"
                          label="Unit Price"
                          placeholder="Enter Unit Price"
                          onChange={(value) =>
                            formik.setFieldValue("unitPrice", value)
                          }
                          value={formik.values.unitPrice}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {selectedPurchaseOrder && (
                  <Grid sx={classes.textField}>
                    <Grid
                      item
                      container
                      className={classes.section}
                      spacing={3}
                    >
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
                    <Grid
                      item
                      container
                      className={classes.section}
                      spacing={3}
                    >
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
                )}

                {!selectedPurchaseOrder && (
                  <Grid
                    item
                    container
                    className={classes.buttonSection}
                    spacing={5}
                  >
                    <Grid item className={classes.textField}>
                      <Grid item>
                        <Grid>
                          <Button
                            id="btn-create-purchase-order"
                            variant="contained"
                            onClick={handleOpenItemColorDialogBox}
                            className={classes.itemNameButton}
                          >
                            <LoupeRoundedIcon className={classes.plusIcon} />
                            {"Select Item Color and Item Quantity"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {request && !selectedPurchaseOrder && (
                  <Grid item className={classes.listTable} xs={12}>
                    <LazyLoadingTable
                      columns={columns}
                      InfiniteScroll={false}
                      data={request}
                      hiddenColumns={["id"]}
                      maxHeightInRows={15}
                      customProps={{ height: 390 }}
                      onClickTableRow={(index, row) => {}}
                    />
                  </Grid>
                )}
                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disbaled={formik.isSubmitting}
                  >
                    {selectedPurchaseOrder ? "UPDATE" : "SAVE"}
                  </Button>
                </Grid>
              </form>
            </Grid>
            {!selectedPurchaseOrder && (
              <Item
                formik={formik}
                openItem={openItem}
                setOpenItem={setOpenItem}
                classes={classes}
                handleSaveItem={handleSaveItem}
                itemColorsArray={itemColorsArray}
                item={item}
                setItem={setItem}
              />
            )}
          </Grid>
        }
      />
    </>
  );
};
export default ManageRequest;
