import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PageLayout from "../../../components/PageLayout";

import { styles } from "../../Stock/ListStock/styles";

const emptyForms = {
  Vendor: {
    name: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
    bankName: "",
    bankAccountNumber: "",
  },
  "Raw Material": {
    name: "",
    code: "",
    type: "",
    color: "",
    size: "",
    price: "",
    vendorId: "",
  },
  "Master Batch": {
    name: "",
    code: "",
    type: "",
    color: "",
    size: "",
    price: "",
    vendorId: "",
  },
  GRN: {
    date: new Date().toISOString().slice(0, 10),
    vendorId: "",
    itemType: "rawMaterial",
    itemId: "",
    quantity: "",
  },
  Consumption: {
    date: new Date().toISOString().slice(0, 10),
    itemType: "rawMaterial",
    itemId: "",
    quantity: "",
    machineNo: "",
    moldNo: "",
    usedBy: "",
  },
};

const initialData = {
  Vendor: [],
  "Raw Material": [],
  "Master Batch": [],
  GRN: [],
  Consumption: [],
};
const tabNames = [
  "Vendor",
  "Raw Material",
  "Master Batch",
  "GRN",
  "Consumption",
];
const labels = {
  name: "Name",
  location: "Location",
  contactPerson: "Contact Person",
  contactNumber: "Contact Number",
  bankName: "Bank Name",
  bankAccountNumber: "Bank Account Number",
  code: "Code",
  type: "Type",
  color: "Color",
  size: "Size",
  price: "Price",
  date: "Date",
  vendorId: "Vendor",
  itemType: "Item Type",
  itemId: "Item",
  quantity: "Quantity",
  machineNo: "Machine Number",
  moldNo: "Mold Number",
  usedBy: "Used By",
};

const RawMaterialStockList = () => {
  const classes = styles();
  const [activeTab, setActiveTab] = useState(0);
  const [records, setRecords] = useState(initialData);
  const [dialogTab, setDialogTab] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState(emptyForms.Vendor);
  const [error, setError] = useState("");
  const activeName = tabNames[activeTab];

  const availableQuantity = useMemo(() => {
    const totals = {};
    records.GRN.forEach((record) => {
      const key = `${record.itemType}:${record.itemId}`;
      totals[key] = (totals[key] || 0) + Number(record.quantity || 0);
    });
    records.Consumption.forEach((record) => {
      const key = `${record.itemType}:${record.itemId}`;
      totals[key] = (totals[key] || 0) - Number(record.quantity || 0);
    });
    return totals;
  }, [records]);

  const itemsForType = (itemType) =>
    itemType === "rawMaterial"
      ? records["Raw Material"]
      : records["Master Batch"];
  const displayValue = (record, key) => {
    if (key === "vendorId")
      return (
        records.Vendor.find((vendor) => vendor.id === record.vendorId)?.name ||
        ""
      );
    if (key === "itemId")
      return (
        itemsForType(record.itemType).find((item) => item.id === record.itemId)
          ?.name || ""
      );
    if (key === "itemType")
      return record.itemType === "rawMaterial"
        ? "Raw Material"
        : "Master Batch";
    return record[key];
  };
  const columnsFor = (tab) => {
    if (tab === "Vendor")
      return [
        "name",
        "location",
        "contactPerson",
        "contactNumber",
        "bankName",
        "bankAccountNumber",
      ];
    if (tab === "Raw Material" || tab === "Master Batch")
      return [
        "name",
        "code",
        "type",
        "color",
        "size",
        "price",
        "vendorId",
        "availableQuantity",
      ];
    if (tab === "GRN")
      return ["date", "vendorId", "itemType", "itemId", "quantity"];
    return [
      "date",
      "itemType",
      "itemId",
      "quantity",
      "machineNo",
      "moldNo",
      "usedBy",
    ];
  };
  const getRows = () =>
    records[activeName].map((record) => ({
      ...record,
      availableQuantity:
        availableQuantity[
          `${activeName === "Raw Material" ? "rawMaterial" : "masterBatch"}:${record.id}`
        ] || 0,
    }));
  const optionsFor = (field) => {
    if (field === "vendorId")
      return records.Vendor.map((vendor) => ({
        value: vendor.id,
        label: vendor.name,
      }));
    if (field === "itemId")
      return itemsForType(form.itemType).map((item) => ({
        value: item.id,
        label: item.name,
      }));
    if (field === "itemType")
      return [
        { value: "rawMaterial", label: "Raw Material" },
        { value: "masterBatch", label: "Master Batch" },
      ];
    return [];
  };
  const openCreate = () => {
    setEditingRecord(null);
    setForm({ ...emptyForms[activeName] });
    setError("");
    setDialogTab(activeName);
  };
  const openEdit = (record) => {
    setEditingRecord(record);
    setForm({ ...emptyForms[activeName], ...record });
    setError("");
    setDialogTab(activeName);
  };
  const handleSave = () => {
    const requiredFields = Object.keys(emptyForms[dialogTab]).filter(
      (key) => key !== "price",
    );
    const missingField = requiredFields.find(
      (key) => !String(form[key] || "").trim(),
    );
    if (missingField) {
      setError(`${labels[missingField]} is required.`);
      return;
    }
    if (
      ["GRN", "Consumption"].includes(dialogTab) &&
      Number(form.quantity) <= 0
    ) {
      setError("Quantity must be greater than zero.");
      return;
    }
    if (dialogTab === "Consumption") {
      const currentStock =
        availableQuantity[`${form.itemType}:${form.itemId}`] || 0;
      const previousQuantity = editingRecord
        ? Number(editingRecord.quantity || 0)
        : 0;
      if (Number(form.quantity) > currentStock + previousQuantity) {
        setError("Consumption cannot be greater than available stock.");
        return;
      }
    }
    const savedRecord = {
      ...form,
      id: editingRecord?.id || `${dialogTab}-${Date.now()}`,
    };
    setRecords((current) => ({
      ...current,
      [dialogTab]: editingRecord
        ? current[dialogTab].map((record) =>
            record.id === editingRecord.id ? savedRecord : record,
          )
        : [...current[dialogTab], savedRecord],
    }));
    setDialogTab(null);
  };
  const handleDelete = (record) =>
    setRecords((current) => ({
      ...current,
      [activeName]: current[activeName].filter((item) => item.id !== record.id),
    }));

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading="Raw Material Stock"
        pageActions={
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={openCreate}
          >
            Add {activeName}
          </Button>
        }
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabNames.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
        <Paper
          variant="outlined"
          sx={{ width: "100%", mt: 2, overflowX: "auto" }}
        >
          {getRows().length === 0 ? (
            <Typography sx={{ p: 4 }} color="text.secondary">
              No {activeName.toLowerCase()} records yet.
            </Typography>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {columnsFor(activeName).map((column) => (
                    <th key={column} style={{ padding: 12, textAlign: "left" }}>
                      {labels[column] || "Available Quantity"}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getRows().map((record) => (
                  <tr key={record.id}>
                    {columnsFor(activeName).map((column) => (
                      <td
                        key={column}
                        style={{ padding: 12, borderTop: "1px solid #eee" }}
                      >
                        {displayValue(record, column) ?? ""}
                      </td>
                    ))}
                    <td style={{ padding: 12, borderTop: "1px solid #eee" }}>
                      <Button
                        size="small"
                        onClick={() => openEdit(record)}
                        aria-label="edit"
                      >
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(record)}
                        aria-label="delete"
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Paper>
      </PageLayout>
      <Dialog
        open={Boolean(dialogTab)}
        onClose={() => setDialogTab(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingRecord ? "Edit" : "Add"} {dialogTab || activeName}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {dialogTab &&
              Object.keys(emptyForms[dialogTab]).map((field) => {
                const options = optionsFor(field);
                const select = options.length > 0 || field === "itemType";
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      size="small"
                      label={labels[field]}
                      type={
                        field === "date"
                          ? "date"
                          : field === "price" || field === "quantity"
                            ? "number"
                            : "text"
                      }
                      value={form[field] || ""}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field]: event.target.value,
                          ...(field === "itemType" ? { itemId: "" } : {}),
                        }))
                      }
                      select={select}
                      InputLabelProps={
                        field === "date" ? { shrink: true } : undefined
                      }
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                );
              })}
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogTab(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RawMaterialStockList;
