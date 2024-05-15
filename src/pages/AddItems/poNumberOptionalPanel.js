import React from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import DeleteIcon from "../../components/DeleteIcon";

import useDeletePoNumber from "../../hooks/services/useDeletePoNumber";

import { styles } from "./styles";

const PoNumberOptionalPanel = ({ values }) => {
  const { mutateAsync: deleter } = useDeletePoNumber({ id: values.id });
  const classes = styles();
  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <Button
          id="btn-delete-credential"
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            deleter();
          }}
          classes={classes.deleteBtn}
          startIcon={<DeleteIcon className={classes.menuIconRoot} />}
        ></Button>
      </Box>
    </Grid>
  );
};

export default PoNumberOptionalPanel;
