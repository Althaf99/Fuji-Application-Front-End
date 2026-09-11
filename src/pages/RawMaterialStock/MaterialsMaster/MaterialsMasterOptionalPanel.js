import React from "react";

import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import useDeleteRawMaterial from "../../../hooks/services/useDeleteRawMaterial";

const MaterialsMasterOptionalPanel = ({
  values,
  setOpenMaterialDialogBox,
  setSelectedMaterial,
}) => {
  const deleteMutation = useDeleteRawMaterial({ id: values?.id });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({});
  };

  const handleEdit = (values) => {
    setSelectedMaterial(values);
    setOpenMaterialDialogBox(true);
  };

  return (
    <Grid container justifyContent="center">
      <Stack direction="row" spacing={1}>
        <IconButton
          sx={{
            "&.MuiIconButton-root": { color: "#DD5746" },
            "&:hover": { "&.MuiIconButton-root": { backgroundColor: "white" } },
          }}
          onClick={() => handleDelete()}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          sx={{
            "&.MuiIconButton-root": { color: "#524C42" },
            "&:hover": { "&.MuiIconButton-root": { backgroundColor: "white" } },
          }}
          onClick={() => handleEdit(values)}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    </Grid>
  );
};

export default MaterialsMasterOptionalPanel;
