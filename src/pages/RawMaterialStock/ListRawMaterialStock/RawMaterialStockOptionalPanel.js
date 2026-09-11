import React from "react";

import { Grid, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { ALERT_LEVEL_COLORS, ALERT_LEVEL_LABELS } from "../helper";

const RawMaterialStockOptionalPanel = ({
  values,
  setOpenEntryDialogBox,
  setSelectedEntry,
  setSelectedMaterial,
  setOpenAuditDialogBox,
  setAuditEntryId,
}) => {
  const handleOpenEntry = () => {
    setSelectedMaterial({
      id: values.materialId,
      name: values.materialName,
      previousClosing: values.opening,
    });
    setSelectedEntry(values.entryId ? values : undefined);
    setOpenEntryDialogBox(true);
  };

  const handleOpenAudit = () => {
    setAuditEntryId(values.entryId);
    setOpenAuditDialogBox(true);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        {values.alertLevel && values.alertLevel !== "ok" && (
          <Chip
            size="small"
            label={ALERT_LEVEL_LABELS[values.alertLevel]}
            sx={{
              backgroundColor: ALERT_LEVEL_COLORS[values.alertLevel],
              color: "#FFFFFF",
            }}
          />
        )}
        <IconButton
          sx={{
            "&.MuiIconButton-root": { color: "#524C42" },
            "&:hover": { "&.MuiIconButton-root": { backgroundColor: "white" } },
          }}
          onClick={handleOpenEntry}
        >
          {values.submitted ? <VisibilityIcon /> : <EditIcon />}
        </IconButton>
        {values.entryId && (
          <IconButton
            sx={{
              "&.MuiIconButton-root": { color: "#0F5EF7" },
              "&:hover": {
                "&.MuiIconButton-root": { backgroundColor: "white" },
              },
            }}
            onClick={handleOpenAudit}
          >
            <HistoryIcon />
          </IconButton>
        )}
      </Stack>
    </Grid>
  );
};

export default RawMaterialStockOptionalPanel;
