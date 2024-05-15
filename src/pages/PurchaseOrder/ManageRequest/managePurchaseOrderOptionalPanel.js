import React from "react";

import { Grid, Button, Box } from "@mui/material";

import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "./styles";

const ManagePurchaseOrderOptionalPanel = ({ values, request, setRequest }) => {
  const handleDeleteElement = (values) => {
    let newArray = request
      .map((obj) => {
        return {
          ...obj,
          item: obj.item.filter(
            (item) =>
              item.itemColor !== values.itemColor ||
              item.quantity !== values.quantity
          ),
        };
      })
      .filter((obj) => obj.item.length > 0);
    setRequest(newArray);
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

export default ManagePurchaseOrderOptionalPanel;
