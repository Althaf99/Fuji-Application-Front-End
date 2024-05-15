import React from "react";

import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import useDeleteRequest from "../../../hooks/services/useDeleteRequest";

const ListPurchaseOrderOptionalPanel = ({
  values,
  setSelectedPurchaseOrder,
  setOpenPurchaseOrder,
}) => {
  const deleteMutation = useDeleteRequest({
    requestId: values?.id,
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({});
  };

  const handleEdit = (values) => {
    setOpenPurchaseOrder(true);
    setSelectedPurchaseOrder(values);
  };

  return (
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
  );
};

export default ListPurchaseOrderOptionalPanel;
