import React from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabeledTextField from "../../components/LabeledTextField";
import DialogBox from "../../components/DialogBox";

import useCreateItemName from "../../hooks/services/useCreateItemName";

const ItemName = ({ openItemName, setOpenItemName, classes, formik }) => {
  const { mutateAsync: createItemName } = useCreateItemName();
  const handleSaveItem = () => {
    const obj = {
      itemName: formik.values.itemName,
    };
    createItemName(obj);
  };
  return (
    <DialogBox
      title={"Add Item Name"}
      saveButtonTitle={"Save Item Name"}
      open={openItemName}
      setOpen={setOpenItemName}
      maxWidth="sm"
      handleSaveButton={handleSaveItem}
      height={"200px"}
      children={
        <Grid>
          <Grid sx={classes.textField}>
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="itemName"
                      name="itemName"
                      label="Item Name"
                      placeholder="Item Name"
                      onChange={(value) =>
                        formik.setFieldValue("itemName", value)
                      }
                      value={formik.values.itemName}
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
export default ItemName;
