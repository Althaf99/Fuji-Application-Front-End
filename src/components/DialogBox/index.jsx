import React from "react";

import {
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";
import NavigationButton from "./NavigationButton";

const DialogBox = ({
  title,
  description,
  saveButtonTitle,
  children,
  id,
  updatingStatus,
  handleSaveButton,
  disableStatus,
  backButtonTitle,
  handleBackButton,
  open,
  setOpen,
  maxWidth,
  ...props
}) => {
  const theme = useTheme();
  const classes = styles(theme, props);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth={maxWidth ? maxWidth : "md"}>
        <DialogTitle style={{ padding: "10px" }}>
          <Grid item container justifyContent="space-between">
            <Grid sx={classes.labelTitle}>{title}</Grid>
            <Grid>
              <IconButton
                id={id}
                onClick={() => {
                  handleClose();
                }}
                sx={{
                  "&.MuiIconButton-root": {
                    color: "#D20062",
                    backgroundColor: "#F8F6E3",
                  },
                  "&:hover": {
                    "&.MuiIconButton-root": {
                      color: "#F8F6E3",
                      backgroundColor: "#D20062",
                    },
                  },
                }}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers sx={classes.dialog}>
          {children}
        </DialogContent>
        <DialogActions>
          {backButtonTitle && (
            <NavigationButton
              id={id}
              updatingStatus={updatingStatus}
              onClickHandler={handleBackButton}
              disableStatus={disableStatus}
              sx={classes.backButton}
            >
              {backButtonTitle}
            </NavigationButton>
          )}
          {saveButtonTitle && (
            <NavigationButton
              id={id}
              updatingStatus={updatingStatus}
              onClickHandler={handleSaveButton}
              disableStatus={disableStatus}
              sx={classes.saveButton}
              type={props.type}
            >
              {saveButtonTitle}
            </NavigationButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogBox;
