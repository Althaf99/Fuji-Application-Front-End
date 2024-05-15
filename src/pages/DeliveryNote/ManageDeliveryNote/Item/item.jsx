import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabelledEditableSelect from "../../../../components/LabelledEditableSelect";
import LazyLoadingTable from "../../../../components/LazyLoadingTable";
import DialogBox from "../../../../components/DialogBox";
import LabeledTextField from "../../../../components/LabeledTextField";

import ItemOptionalPanel from ".";

const Item = ({
  openItem,
  setOpenItem,
  handleSaveItem,
  classes,
  formik,
  itemColorsArray,
}) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Color",
      accessor: "itemColor",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Description",
      accessor: "description",
      width: "35%",
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
        return <ItemOptionalPanel values={values} formik={formik} />;
      },
    },
  ];

  return (
    <DialogBox
      title={"Select Item Color and Quantity"}
      saveButtonTitle={"Add"}
      open={openItem}
      setOpen={setOpenItem}
      maxWidth="sm"
      handleSaveButton={handleSaveItem}
      children={
        <Grid>
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
                      id="description"
                      name="description"
                      label="Description"
                      placeholder="Description"
                      onChange={(value) =>
                        formik.setFieldValue("description", value)
                      }
                      value={formik.values.description}
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
          </Grid>
        </Grid>
      }
    />
  );
};
export default Item;
