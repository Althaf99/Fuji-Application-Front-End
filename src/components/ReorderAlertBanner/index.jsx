import React from "react";

import { Grid, Chip } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { ALERT_LEVEL_LABELS, ALERT_LEVEL_COLORS } from "../../pages/RawMaterialStock/helper";

// Renders chips for any material flagged "low" or "critical" by the reorder rule engine.
const ReorderAlertBanner = ({ alerts }) => {
  const flagged = alerts?.filter(
    (alert) => alert.alertLevel === "critical" || alert.alertLevel === "low"
  );

  if (!flagged || flagged.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={1} alignItems="center" sx={{ padding: "10px 0" }}>
      <Grid item>
        <WarningAmberIcon sx={{ color: "#DD5746" }} />
      </Grid>
      {flagged.map((alert) => (
        <Grid item key={alert.materialId}>
          <Chip
            label={`${alert.materialName}: ${
              alert.daysCover !== null ? alert.daysCover.toFixed(1) : "?"
            } days cover (${ALERT_LEVEL_LABELS[alert.alertLevel]})`}
            sx={{
              backgroundColor: ALERT_LEVEL_COLORS[alert.alertLevel],
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReorderAlertBanner;
