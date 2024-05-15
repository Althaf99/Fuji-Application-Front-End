import React, { useState } from "react";

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
  item,
  setItem,
}) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
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
          <ItemOptionalPanel values={values} setItem={setItem} item={item} />
        );
      },
    },
  ];

  return (
    <DialogBox
      title={"Select Item and Unit Price"}
      saveButtonTitle="Add"
      open={openItem}
      setOpen={setOpenItem}
      maxWidth="sm"
      height={"300px"}
      // updatingStatus={isUpdating}
      // disableStatus={isUpdating || !selectedList.length}
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
          {item && item.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={item}
                InfiniteScroll={false}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
              />
            </Grid>
          )}
        </Grid>
      }
    />
  );
};
export default Item;
