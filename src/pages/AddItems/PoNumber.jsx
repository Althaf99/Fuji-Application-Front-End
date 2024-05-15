import React from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabeledTextField from "../../components/LabeledTextField";
import DialogBox from "../../components/DialogBox";

import useCreatePoNumber from "../../hooks/services/useCreatePoNumber";

const PoNumber = ({ openPo, setOPenPo, classes, formik }) => {
  const { mutateAsync: createPoNumber } = useCreatePoNumber();
  const handleSaveItem = () => {
    const obj = {
      requestNumber: formik.values.poNumber,
    };
    createPoNumber(obj);
  };
  return (
    <DialogBox
      title={"Add PO Number"}
      saveButtonTitle={"Save PO Number"}
      open={openPo}
      setOpen={setOPenPo}
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
                      id="poNumber"
                      name="poNumber"
                      label="PO Number"
                      placeholder="PO Number"
                      onChange={(value) =>
                        formik.setFieldValue("poNumber", value)
                      }
                      value={formik.values.poNumber}
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
export default PoNumber;
