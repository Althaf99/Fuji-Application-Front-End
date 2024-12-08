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
      cavity: formik.values.cavity,
      weightPerPiece: formik.values.weightPerPiece,
      cycleTime: formik.values.cycleTime,
    };
    createItemName(obj);
  };
  return (
    <DialogBox
      title={"Add Item Details"}
      saveButtonTitle={"Save Item Details"}
      open={openItemName}
      setOpen={setOpenItemName}
      maxWidth="sm"
      handleSaveButton={handleSaveItem}
      height={"400px"}
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
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FormControl fullWidth>
                    <LabeledTextField
                      id="cavity"
                      name="cavity"
                      label="Cavity"
                      placeholder="Cavity"
                      onChange={(value) =>
                        formik.setFieldValue("cavity", value)
                      }
                      value={formik.values.cavity}
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
                      id="weightPerPiece"
                      name="weightPerPiece"
                      label="Weight Per Piece"
                      placeholder="Weight Per Piece"
                      onChange={(value) =>
                        formik.setFieldValue("weightPerPiece", value)
                      }
                      value={formik.values.weightPerPiece}
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
                      id="cycleTime"
                      name="cycleTime"
                      label="Cycle Time"
                      placeholder="Cycle Time"
                      onChange={(value) =>
                        formik.setFieldValue("cycleTime", value)
                      }
                      value={formik.values.cycleTime}
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
