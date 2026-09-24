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
import useRawMaterialStock from "../../../hooks/services/useRawMaterialStock";

import { styles } from "../../Stock/ListStock/styles";

const emptyForms = {
  Vendor: {
    name: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
  },
  "Raw Material": {
    code: "",
    type: "",
    color: "",
    price: "",
  },
  "Master Batch": {
    code: "",
    // type: "",
    color: "",
    price: "",
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

const normalizeGrns = (grns) =>
  grns.flatMap((grn) =>
    (grn.items || []).map((item) => ({
      ...item,
      id: `${grn.id}-${item.id}`,
      parentId: grn.id,
      date: grn.date,
      vendorId: grn.vendor?.id || grn.vendorId,
    })),
  );
const filterFields = {
  Vendor: ["name", "location"],
  "Raw Material": ["type", "color"],
  "Master Batch": ["code", "color"],
  GRN: ["date", "vendorId", "itemType", "itemId"],
  Consumption: ["itemType", "itemId", "machineNo", "moldNo", "usedBy"],
};

const RawMaterialStockList = () => {
  const classes = styles();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogTab, setDialogTab] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState(emptyForms.Vendor);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    Vendor: { name: "", location: "" },
    "Raw Material": { type: "", color: "" },
    "Master Batch": { code: "", color: "" },
    GRN: { date: "", vendorId: "", itemType: "", itemId: "" },
    Consumption: {
      itemType: "",
      itemId: "",
      machineNo: "",
      moldNo: "",
      usedBy: "",
    },
  });
  const activeName = tabNames[activeTab];
  const {
    vendors,
    rawMaterials,
    masterBatches,
    grns,
    consumptions,
    stock,
    isLoading,
    error: queryError,
    mutateAsync,
    isSaving,
  } = useRawMaterialStock();
  const records = useMemo(
    () => ({
      Vendor: vendors,
      "Raw Material": rawMaterials,
      "Master Batch": masterBatches,
      GRN: normalizeGrns(grns),
      Consumption: consumptions,
    }),
    [vendors, rawMaterials, masterBatches, grns, consumptions],
  );

  const availableQuantity = useMemo(() => {
    return stock.reduce(
      (totals, row) => ({
        ...totals,
        [`${row.itemType}:${row.itemId}`]: row.availableQuantity,
      }),
      {},
    );
  }, [stock]);

  const itemsForType = (itemType) =>
    itemType === "rawMaterial"
      ? records["Raw Material"]
      : records["Master Batch"];
  const itemDisplay = (item) =>
    item
      ? item.type
        ? `${item.type} - ${item.color} - ${item.code}`
        : `${item.code} - ${item.color}`
      : "";
  const displayValue = (record, key) => {
    if (key === "vendorId")
      return (
        vendors.find((vendor) => vendor.id === record.vendorId)?.name || ""
      );
    if (key === "itemId")
      return itemsForType(record.itemType).find(
        (item) => item.id === record.itemId,
      )
        ? itemDisplay(
            itemsForType(record.itemType).find(
              (item) => item.id === record.itemId,
            ),
          )
        : "";
    if (key === "itemType")
      return record.itemType === "rawMaterial"
        ? "Raw Material"
        : "Master Batch";
    return record[key];
  };
  const columnsFor = (tab) => {
    if (tab === "Vendor")
      return ["name", "location", "contactPerson", "contactNumber"];
    if (tab === "Raw Material")
      return ["code", "type", "color", "price", "availableQuantity"];
    if (tab === "Master Batch")
      return ["code", "color", "price", "availableQuantity"];
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
  const filteredRows = () => {
    return getRows().filter((record) =>
      Object.entries(filters[activeName]).every(
        ([field, filter]) =>
          !filter ||
          String(displayValue(record, field)).toLowerCase() ===
            String(filter).toLowerCase(),
      ),
    );
  };
  const filterOptionsFor = (field) =>
    [
      ...new Set(
        getRows()
          .map((record) => displayValue(record, field))
          .filter(Boolean),
      ),
    ].sort();
  const clearFilters = () =>
    setFilters((current) => ({
      ...current,
      [activeName]: Object.keys(current[activeName]).reduce(
        (cleared, field) => ({ ...cleared, [field]: "" }),
        {},
      ),
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
        label: itemDisplay(item),
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
  const handleSave = async () => {
    const requiredFields = Object.keys(emptyForms[dialogTab]).filter(
      (key) =>
        key !== "price" || ["Raw Material", "Master Batch"].includes(dialogTab),
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
    const payload =
      dialogTab === "GRN"
        ? {
            date: form.date,
            vendorId: Number(form.vendorId),
            items: [
              {
                itemType: form.itemType,
                itemId: Number(form.itemId),
                quantity: Number(form.quantity),
              },
            ],
          }
        : dialogTab === "Consumption"
          ? {
              date: form.date,
              itemType: form.itemType,
              itemId: Number(form.itemId),
              quantity: Number(form.quantity),
              machineNo: form.machineNo,
              moldNo: form.moldNo,
              usedBy: form.usedBy,
            }
          : {
              ...form,
              price: form.price === "" ? null : Number(form.price),
            };
    const resourcePath = {
      Vendor: "/vendors",
      "Raw Material": "/raw-materials",
      "Master Batch": "/master-batches",
      GRN: "/grns",
      Consumption: "/consumptions",
    }[dialogTab];
    try {
      await mutateAsync({
        method: editingRecord ? "put" : "post",
        path: editingRecord
          ? `${resourcePath}/${editingRecord.parentId || editingRecord.id}`
          : resourcePath,
        data: payload,
      });
      setDialogTab(null);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to save this record. Please try again.",
      );
    }
  };
  const handleDelete = async (record) => {
    const resourcePath = {
      Vendor: "/vendors",
      "Raw Material": "/raw-materials",
      "Master Batch": "/master-batches",
      GRN: "/grns",
      Consumption: "/consumptions",
    }[activeName];
    try {
      await mutateAsync({
        method: "delete",
        path: `${resourcePath}/${record.parentId || record.id}`,
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this record. Please try again.",
      );
    }
  };

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading="Raw Material Stock"
        pageActions={
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={openCreate}
            disabled={isSaving}
          >
            Add {activeName}
          </Button>
        }
      >
        {queryError && (
          <Typography color="error" sx={{ mb: 2 }}>
            Unable to load Raw Material Stock data. Please check that the
            backend is running.
          </Typography>
        )}
        {isLoading && <Typography sx={{ mb: 2 }}>Loading...</Typography>}
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
        <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
          {filterFields[activeName].map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field}>
              <TextField
                select
                fullWidth
                size="small"
                label={labels[field]}
                value={filters[activeName][field]}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    [activeName]: {
                      ...current[activeName],
                      [field]: event.target.value,
                    },
                  }))
                }
              >
                <MenuItem value="">All</MenuItem>
                {filterOptionsFor(field).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" onClick={clearFilters} sx={{ mt: 0.5 }}>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
        <Paper
          variant="outlined"
          sx={{ width: "100%", mt: 2, overflowX: "auto" }}
        >
          {filteredRows().length === 0 ? (
            <Typography sx={{ p: 4 }} color="text.secondary">
              {getRows().length === 0
                ? `No ${activeName.toLowerCase()} records yet.`
                : "No matching records."}
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
                  <th style={{ textAlign: "left" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows().map((record) => (
                  <tr key={record.id}>
                    {columnsFor(activeName).map((column) => (
                      <td
                        key={column}
                        style={{ padding: 12, borderTop: "1px solid #eee" }}
                      >
                        {displayValue(record, column) ?? ""}
                      </td>
                    ))}
                    <td style={{ borderTop: "1px solid #eee" }}>
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
