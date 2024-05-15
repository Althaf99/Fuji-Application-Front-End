import React from "react";

import { Grid, Button, Box } from "@mui/material";

import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "./styles";

const ManageDeliveryNoteOptionalPanel = ({
  values,
  deliveryNote,
  setDeliveryNote,
}) => {
  const handleDeleteElement = (values) => {
    const arrayList = deliveryNote.filter(
      (item) =>
        item.itemColor !== values.itemColor ||
        item.quantity !== values.quantity ||
        item.description !== values.description
    );
    setDeliveryNote(arrayList);
  };

  const classes = styles();
  return (
    <Button
      id="btn-delete-credential"
      variant="text"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteElement(values);
      }}
      classes={classes.deleteBtn}
      startIcon={<DeleteIcon className={classes.menuIconRoot} />}
    ></Button>
  );
};

export default ManageDeliveryNoteOptionalPanel;
