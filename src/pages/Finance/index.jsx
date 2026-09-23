import React, { useMemo, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import {
  AddCircleOutline,
  ArrowDownward,
  ArrowUpward,
  AccountBalanceWalletOutlined,
  FileDownloadOutlined,
  FilterListOutlined,
  LocalAtmOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PageLayout from "../../components/PageLayout";
import FinancePrinter from "../../components/Printers/FinancePrinter";
import CustomSelectDateRange from "../../components/CustomSelectDateRange";
import useFinance from "../../hooks/services/useFinance";
import { useStyles } from "./styles";

const categories = [
  "All categories",
  "Sales",
  "Raw materials",
  "Paint items",
  "Electricity",
  "Labor",
  "Machine maintenance",
  "Overhead",
  "Delivery",
];

const formatMoney = (amount) =>
  `LKR ${Number(amount || 0).toLocaleString("en-LK")}`;

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const toApiDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculatePercentChange = (current, previous, reportedChange) => {
  if (reportedChange !== undefined && reportedChange !== null) {
    return Number(reportedChange);
  }

  if (!previous) return current ? null : 0;

  return ((current - previous) / previous) * 100;
};

const formatPercentChange = (change, period) => {
  if (change === null || Number.isNaN(change)) {
    return `No previous ${period.toLowerCase()} data`;
  }

  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous ${period.toLowerCase()}`;
};

const Finance = () => {
  const classes = useStyles();
  const printRef = useRef(null);
  const today = new Date();
  const [dateRange, setDateRange] = useState(() => {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return [start, today];
  });
  const [typeFilter, setTypeFilter] = useState("All types");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState({
    type: "Expense",
    category: "Raw materials",
    referenceNumber: "",
    description: "",
    date: "2026-09-23",
    dueDate: "2026-09-23",
    method: "Bank transfer",
    amount: "",
    status: "Paid",
  });

  const {
    transactions,
    summary,
    isLoading,
    error,
    createTransaction,
    isSaving,
  } = useFinance({
    period: "Custom range",
    startDate: dateRange[0] ? toApiDate(dateRange[0]) : undefined,
    endDate: dateRange[1] ? toApiDate(dateRange[1]) : undefined,
    type: typeFilter,
    category: categoryFilter,
    status: statusFilter,
  });

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          (typeFilter === "All types" || transaction.type === typeFilter) &&
          (categoryFilter === "All categories" ||
            transaction.category === categoryFilter) &&
          (statusFilter === "All statuses" ||
            transaction.status === statusFilter),
      ),
    [transactions, typeFilter, categoryFilter, statusFilter],
  );

  const totals = summary;
  const categoryTotals = summary.expenseBreakdown || [];
  const comparisonPeriod = "selected period";
  const revenueChange = calculatePercentChange(
    totals.incomeTotal,
    Number(totals.comparison?.revenue || 0),
    totals.changes?.revenuePercent,
  );
  const expenseChange = calculatePercentChange(
    totals.expenseTotal,
    Number(totals.comparison?.expenses || 0),
    totals.changes?.expensesPercent,
  );

  const updateForm = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const addTransaction = async () => {
    if (!form.referenceNumber || !form.description || !form.amount) return;
    try {
      setSaveError("");
      await createTransaction(form);
    } catch (saveFailure) {
      setSaveError(
        saveFailure.response?.data?.message ||
          "Unable to save this transaction.",
      );
      return;
    }
    setDialogOpen(false);
    setForm({
      type: "Expense",
      category: "Raw materials",
      referenceNumber: "",
      description: "",
      date: "2026-09-23",
      dueDate: "2026-09-23",
      method: "Bank transfer",
      amount: "",
      status: "Paid",
    });
  };

  const resetFilters = () => {
    setTypeFilter("All types");
    setCategoryFilter("All categories");
    setStatusFilter("All statuses");
  };

  const summaryCards = [
    {
      label: "Revenue",
      value: formatMoney(totals.incomeTotal),
      note: formatPercentChange(revenueChange, comparisonPeriod),
      icon: <TrendingUpOutlined />,
      color: "#147d64",
      positive: revenueChange === null || revenueChange >= 0,
    },
    {
      label: "Expenses",
      value: formatMoney(totals.expenseTotal),
      note: formatPercentChange(expenseChange, comparisonPeriod),
      icon: <ArrowDownward />,
      color: "#c65b35",
      positive: expenseChange === null || expenseChange <= 0,
    },
    {
      label: "Cash flow",
      value: formatMoney(totals.cashFlow),
      note: "Received less paid",
      icon: <AccountBalanceWalletOutlined />,
      color: "#2463a6",
      positive: true,
    },
    {
      label: "Profit margin",
      value: `${totals.margin.toFixed(1)}%`,
      note: "Backend-calculated target",
      icon: <LocalAtmOutlined />,
      color: "#8055a3",
      positive: true,
    },
  ];

  return (
    <Box className={classes.page}>
      <PageLayout
        pageHeading="Finance"
        helperText="A clear view of sales, cash movement, and operating costs."
        pageActions={
          <Stack direction="row" spacing={1}>
            <ReactToPrint
              trigger={() => (
                <Button
                  className={classes.printButton}
                  startIcon={<FileDownloadOutlined />}
                >
                  Export PDF
                </Button>
              )}
              content={() => printRef.current}
              documentTitle="Fuji Finance Report"
            />
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={() => setDialogOpen(true)}
            >
              Add transaction
            </Button>
          </Stack>
        }
      >
        <Box className={classes.hero}>
          <Box>
            <Typography className={classes.eyebrow}>
              Financial overview
            </Typography>
            <Typography className={classes.heroTitle}>
              Know where the money moves.
            </Typography>
            <Typography className={classes.heroCopy}>
              Select any date range, then drill into every receipt and outgoing
              payment for that period.
            </Typography>
          </Box>
          <Box className={classes.periodSelect}>
            <CustomSelectDateRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={setDateRange}
            />
          </Box>
        </Box>

        <Grid container spacing={1.5} className={classes.summaryGrid}>
          {summaryCards.map((card) => (
            <Grid item xs={12} sm={6} lg={3} key={card.label}>
              <Paper className={classes.summaryCard}>
                <Box className={classes.cardTop}>
                  <Box
                    className={classes.metricIcon}
                    sx={{
                      color: card.color,
                      backgroundColor: `${card.color}14`,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography className={classes.cardLabel}>
                    {card.label}
                  </Typography>
                </Box>
                <Typography className={classes.metricValue}>
                  {card.value}
                </Typography>
                <Typography
                  className={classes.cardNote}
                  sx={{ color: card.positive ? "#147d64" : "#c65b35" }}
                >
                  {card.note}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Paper className={classes.panel}>
          <Box className={classes.panelHeader}>
            <Box>
              <Typography className={classes.panelTitle}>
                Transactions
              </Typography>
              <Typography className={classes.panelSub}>
                {filteredTransactions.length} records in the selected date range
              </Typography>
            </Box>
            <FilterListOutlined className={classes.filterIcon} />
          </Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            className={classes.filters}
          >
            <FormControl size="small" className={classes.filterField}>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <MenuItem value="All types">All types</MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" className={classes.filterField}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" className={classes.filterField}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <MenuItem value="All statuses">All statuses</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="Outstanding">Outstanding</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Due">Due</MenuItem>
              </Select>
            </FormControl>
            <Button className={classes.clearButton} onClick={resetFilters}>
              Clear filters
            </Button>
          </Stack>
          <TableContainer>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Unable to load finance data. Check the backend connection and
                try again.
              </Alert>
            )}
            <Table size="small">
              <TableHead>
                <TableRow>
                  {[
                    "Date",
                    "Due",
                    "Type",
                    "Category",
                    "Description",
                    "Method",
                    "Status",
                    "Amount",
                  ].map((heading) => (
                    <TableCell key={heading} className={classes.tableHead}>
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      Loading finance transactions...
                    </TableCell>
                  </TableRow>
                ) : filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      No finance transactions found for the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow hover key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        {formatDate(transaction.dueDate || transaction.date)}
                      </TableCell>
                      <TableCell>
                        <Box
                          className={
                            transaction.type === "Income"
                              ? classes.incomeType
                              : classes.expenseType
                          }
                        >
                          {transaction.type === "Income" ? (
                            <ArrowUpward />
                          ) : (
                            <ArrowDownward />
                          )}
                          {transaction.type}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.category}
                          size="small"
                          className={classes.categoryChip}
                        />
                      </TableCell>
                      <TableCell className={classes.descriptionCell}>
                        {transaction.description}
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          className={
                            transaction.status === "Outstanding" ||
                            transaction.status === "Due"
                              ? classes.warningChip
                              : classes.statusChip
                          }
                        />
                      </TableCell>
                      <TableCell align="right" className={classes.amountCell}>
                        {transaction.type === "Income" ? "+" : "-"}
                        {formatMoney(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Grid container spacing={1.5} className={classes.contentGrid}>
          {/* <Grid item xs={12} lg={8}>
            <Paper className={classes.panel}>
              <Box className={classes.panelHeader}>
                <Box>
                  <Typography className={classes.panelTitle}>
                    Cash position
                  </Typography>
                  <Typography className={classes.panelSub}>
                    This period compared with last period
                  </Typography>
                </Box>
                <Chip
                  icon={<ArrowUpward />}
                  label="Healthy movement"
                  className={classes.healthyChip}
                />
              </Box>
              <Box className={classes.cashChart}>
                <Box className={classes.chartLegend}>
                  <span>
                    <i className={classes.incomeLegend} />
                    Income
                  </span>
                  <span>
                    <i className={classes.expenseLegend} />
                    Expenses
                  </span>
                </Box>
                {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, index) => (
                  <Box className={classes.chartRow} key={week}>
                    <Typography>{week}</Typography>
                    <Box className={classes.chartTrack}>
                      <Box
                        className={classes.incomeBar}
                        sx={{ width: `${[68, 82, 58, 92][index]}%` }}
                      />
                      <Box
                        className={classes.expenseBar}
                        sx={{ width: `${[42, 56, 34, 48][index]}%` }}
                      />
                    </Box>
                    <Typography>
                      {formatMoney([318000, 404000, 269000, 470000][index])}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box className={classes.compareLine}>
                <Typography>
                  <strong>{formatMoney(totals.received)}</strong> received this
                  period
                </Typography>
                <Typography>
                  <strong>{formatMoney(totals.outstanding)}</strong> outstanding
                  receivables
                </Typography>
              </Box>
            </Paper>
          </Grid> */}
          <Grid item xs={12} lg={4}>
            <Paper className={classes.panel}>
              <Typography className={classes.panelTitle}>
                Expense mix
              </Typography>
              <Typography className={classes.panelSub}>
                Where money is going this period
              </Typography>
              <Box className={classes.expenseList}>
                {categoryTotals.map((item) => (
                  <Box className={classes.expenseItem} key={item.category}>
                    <Box className={classes.expenseName}>
                      <span className={classes.categoryDot} />
                      {item.category}
                    </Box>
                    <Typography>{formatMoney(item.amount)}</Typography>
                  </Box>
                ))}
              </Box>
              <Box className={classes.expenseTotal}>
                <Typography>Total expenses</Typography>
                <Typography>{formatMoney(totals.expenseTotal)}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </PageLayout>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add finance transaction</DialogTitle>
        <DialogContent>
          {saveError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {saveError}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={form.type}
                  label="Type"
                  onChange={updateForm("type")}
                >
                  <MenuItem value="Income">Incoming payment</MenuItem>
                  <MenuItem value="Expense">
                    Outgoing payment / expense
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                fullWidth
                options={categories.slice(1)}
                value={form.category}
                onChange={(_, value) =>
                  setForm((current) => ({
                    ...current,
                    category: value || "",
                  }))
                }
                onInputChange={(_, value) =>
                  setForm((current) => ({
                    ...current,
                    category: value,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    label="Category"
                    placeholder="Select or type a category"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Reference number"
                placeholder="e.g. PO-284 or EXP-2026-001"
                value={form.referenceNumber}
                onChange={updateForm("referenceNumber")}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Description or reference"
                value={form.description}
                onChange={updateForm("description")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={updateForm("date")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Due date"
                InputLabelProps={{ shrink: true }}
                value={form.dueDate}
                onChange={updateForm("dueDate")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Amount (LKR)"
                value={form.amount}
                onChange={updateForm("amount")}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment method</InputLabel>
                <Select
                  value={form.method}
                  label="Payment method"
                  onChange={updateForm("method")}
                >
                  <MenuItem value="Bank transfer">Bank transfer</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Standing order">Standing order</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={form.status}
                  label="Status"
                  onChange={updateForm("status")}
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Received">Received</MenuItem>
                  <MenuItem value="Due">Due</MenuItem>
                  <MenuItem value="Outstanding">Outstanding</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={addTransaction}
            disabled={
              !form.referenceNumber ||
              !form.description ||
              !form.amount ||
              isSaving
            }
          >
            {isSaving ? "Saving..." : "Save transaction"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box className={classes.printOnly}>
        <FinancePrinter
          ref={printRef}
          transactions={filteredTransactions}
          totals={totals}
          period={
            dateRange[0] && dateRange[1]
              ? `${formatDate(toApiDate(dateRange[0]))} - ${formatDate(
                  toApiDate(dateRange[1]),
                )}`
              : "Selected date range"
          }
        />
      </Box>
    </Box>
  );
};

export default Finance;
