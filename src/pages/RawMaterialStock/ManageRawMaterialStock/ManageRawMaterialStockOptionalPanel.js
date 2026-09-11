import React from "react";

import { Button } from "@mui/material";

import DeleteIcon from "../../../components/DeleteIcon";

const ManageRawMaterialStockOptionalPanel = ({ values, consumption, setConsumption }) => {
  const handleDeleteElement = (values) => {
    const arrayList = consumption.filter(
      (row) =>
        row.machine !== values.machine ||
        row.mold !== values.mold ||
        row.shift !== values.shift ||
        row.quantity !== values.quantity
    );
    setConsumption(arrayList);
  };

  return (
    <Button
      id="btn-delete-consumption-row"
      variant="text"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteElement(values);
      }}
      startIcon={<DeleteIcon />}
    ></Button>
  );
};

export default ManageRawMaterialStockOptionalPanel;
