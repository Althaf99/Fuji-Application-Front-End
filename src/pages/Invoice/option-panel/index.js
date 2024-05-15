import React from "react";

import { Grid } from "@mui/material";

import LabeledChip from "../../../components/LabeledChip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import useDeleteInvoice from "../../../hooks/services/useDeleteInvoice";

const OptionPanel = ({
  values,
  setOpenManageInvoiceDialogBox,
  setSelectedInvoice,
}) => {
  const deleteMutation = useDeleteInvoice({
    id: values?.id,
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({});
  };

  const handleEdit = (values) => {
    setOpenManageInvoiceDialogBox(true);
    setSelectedInvoice(values);
  };
  return (
    <Grid>
      {values?.quantity <= 0 ? (
        <LabeledChip label={"Excess"} backgroundColor={"#B5B5B5"} />
      ) : (
        <Grid container justifyContent="center">
          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{
                "&.MuiIconButton-root": {
                  color: "#DD5746",
                },
                "&:hover": {
                  "&.MuiIconButton-root": {
                    backgroundColor: "white",
                  },
                },
              }}
              onClick={(e) => {
                handleDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{
                "&.MuiIconButton-root": {
                  color: "#524C42",
                },
                "&:hover": {
                  "&.MuiIconButton-root": {
                    backgroundColor: "white",
                  },
                },
              }}
              onClick={(e) => {
                handleEdit(values);
              }}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default OptionPanel;
