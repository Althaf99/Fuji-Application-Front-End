import React from "react";

import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import LabeledChip from "../../../components/LabeledChip";

import useDeleteExcess from "../../../hooks/services/useDeleteExcess";

const OptionPanel = ({
  values,
  setOpenManageExcessDialogBox,
  setSelectedExcess,
}) => {
  const deleteMutation = useDeleteExcess({
    id: values?.id,
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({});
  };

  const handleEdit = (values) => {
    setOpenManageExcessDialogBox(true);
    setSelectedExcess(values);
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
