import React, { useEffect } from "react";

import { Grid, Button, Box } from "@mui/material";

import DeleteIcon from "../../../../components/DeleteIcon";

import { styles } from "../styles";

const ItemOptionalPanel = ({ values, setItem, item }) => {
  const classes = styles();

  const handleDeleteElement = (values) => {
    let newArray = item.filter(
      (i) => i.itemColor !== values.itemColor || i.quantity !== values.quantity
    );
    setItem(newArray);
  };

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

export default ItemOptionalPanel;
