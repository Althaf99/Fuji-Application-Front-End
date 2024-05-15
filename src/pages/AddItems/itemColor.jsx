import React from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabeledTextField from "../../components/LabeledTextField";
import DialogBox from "../../components/DialogBox";

import useCreateItemColor from "../../hooks/services/useCreateItemColor";

const ItemColor = ({ openItemColor, setOpenItemColor, classes, formik }) => {
  const { mutateAsync: createItemColor } = useCreateItemColor();
  const handleSaveItem = () => {
    const obj = {
      itemColor: formik.values.itemColor,
    };
    createItemColor(obj);
  };
  return (
    <DialogBox
      title={"Add Item Color"}
      saveButtonTitle={"Save Item Color"}
      open={openItemColor}
      setOpen={setOpenItemColor}
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
                      id="itemColor"
                      name="itemColor"
                      label="Item Color"
                      placeholder="Item Color"
                      onChange={(value) =>
                        formik.setFieldValue("itemColor", value)
                      }
                      value={formik.values.itemColor}
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
export default ItemColor;
