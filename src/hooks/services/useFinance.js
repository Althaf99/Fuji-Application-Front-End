import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

const displayMap = {
  INCOME: "Income",
  EXPENSE: "Expense",
  SALES: "Sales",
  RAW_MATERIALS: "Raw materials",
  PAINT_ITEMS: "Paint items",
  ELECTRICITY: "Electricity",
  LABOR: "Labor",
  MACHINE_MAINTENANCE: "Machine maintenance",
  OVERHEAD: "Overhead",
  DELIVERY: "Delivery",
  CASH: "Cash",
  BANK_TRANSFER: "Bank transfer",
  CARD: "Card",
  CHEQUE: "Cheque",
  STANDING_ORDER: "Standing order",
  RECEIVED: "Received",
  PAID: "Paid",
  OUTSTANDING: "Outstanding",
  DUE: "Due",
  VOIDED: "Voided",
};

const enumMap = Object.entries(displayMap).reduce(
  (map, [value, label]) => ({ ...map, [label]: value }),
  {},
);

const unwrap = (data) => data?.content ?? data?.items ?? data?.data ?? data;

const toDisplayValue = (value) => displayMap[value] || value || "";

const normalizeTransaction = (transaction) => ({
  ...transaction,
  date: transaction.date || transaction.transactionDate,
  dueDate: transaction.dueDate || transaction.due_date || transaction.date,
  type: toDisplayValue(transaction.type),
  category: toDisplayValue(transaction.category),
  method: toDisplayValue(transaction.method || transaction.paymentMethod),
  status: toDisplayValue(transaction.status),
  amount: Number(transaction.amount || 0),
});

const normalizeSummary = (data) => {
  const summary = data?.current || data || {};
  return {
    incomeTotal: Number(summary.revenue ?? summary.incomeTotal ?? 0),
    expenseTotal: Number(summary.expenses ?? summary.expenseTotal ?? 0),
    received: Number(summary.paymentsReceived ?? summary.received ?? summary.cashIn ?? 0),
    outstanding: Number(summary.receivables ?? summary.outstanding ?? 0),
    cashFlow: Number(summary.cashFlow ?? ((summary.cashIn || 0) - (summary.cashOut || 0))),
    margin: Number(summary.profitMargin ?? summary.margin ?? 0),
    comparison: data?.comparison || {},
    changes: data?.changes || {},
    expenseBreakdown: (data?.expenseBreakdown || []).map((item) => ({
      category: toDisplayValue(item.category),
      amount: Number(item.amount || 0),
      percentage: Number(item.percentage || 0),
    })),
  };
};

const formatApiDate = (date) => date.toISOString().slice(0, 10);

const rangeForPeriod = (period, selectedStartDate, selectedEndDate) => {
  if (selectedStartDate && selectedEndDate) {
    const start = new Date(`${selectedStartDate}T00:00:00`);
    const end = new Date(`${selectedEndDate}T00:00:00`);
    const duration = Math.max(
      1,
      Math.round((end - start) / (24 * 60 * 60 * 1000)) + 1,
    );
    const comparisonEnd = new Date(start);
    comparisonEnd.setDate(comparisonEnd.getDate() - 1);
    const comparisonStart = new Date(comparisonEnd);
    comparisonStart.setDate(comparisonStart.getDate() - duration + 1);

    return {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      comparisonStartDate: formatApiDate(comparisonStart),
      comparisonEndDate: formatApiDate(comparisonEnd),
    };
  }

  const end = new Date();
  const start = new Date(end);
  if (period === "This quarter") start.setMonth(start.getMonth() - 3);
  else if (period === "This year") start.setFullYear(start.getFullYear() - 1);
  else start.setMonth(start.getMonth() - 1);

  return { startDate: formatApiDate(start), endDate: formatApiDate(end) };
};

const buildParams = ({ period, startDate, endDate, type, category, status }) => {
  const params = rangeForPeriod(period, startDate, endDate);
  if (type !== "All types") params.type = enumMap[type] || type;
  if (category !== "All categories") params.category = enumMap[category] || category;
  if (status !== "All statuses") params.status = enumMap[status] || status;
  return params;
};

const useFinance = ({ period, startDate, endDate, type, category, status }) => {
  const queryClient = useQueryClient();
  const params = buildParams({ period, startDate, endDate, type, category, status });
  const queryOptions = { refetchOnWindowFocus: false, keepPreviousData: true };

  const summaryQuery = useQuery(
    ["finance", "summary", params],
    () => api.get("/finance/summary", { params }).then((response) => normalizeSummary(response.data)),
    queryOptions,
  );

  const transactionsQuery = useQuery(
    ["finance", "transactions", params],
    () => api.get("/finance/transactions", { params }).then((response) => {
      const rows = unwrap(response.data);
      return Array.isArray(rows) ? rows.map(normalizeTransaction) : [];
    }),
    queryOptions,
  );

  const createMutation = useMutation(
    (transaction) =>
      api.post("/finance/transactions", {
        amount: Number(transaction.amount),
        category: enumMap[transaction.category] || transaction.category,
        currency: "LKR",
        description: transaction.description,
        dueDate: transaction.dueDate || transaction.date,
        paymentMethod: enumMap[transaction.method] || transaction.method,
        referenceNumber: transaction.referenceNumber,
        status: enumMap[transaction.status] || transaction.status,
        transactionDate: transaction.date,
        type: enumMap[transaction.type] || transaction.type,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("finance"),
    },
  );

  return {
    transactions: transactionsQuery.data || [],
    summary: summaryQuery.data || normalizeSummary({}),
    isLoading: summaryQuery.isLoading || transactionsQuery.isLoading,
    error: summaryQuery.error || transactionsQuery.error,
    createTransaction: createMutation.mutateAsync,
    isSaving: createMutation.isLoading,
  };
};

export default useFinance;
