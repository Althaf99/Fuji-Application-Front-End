export { formatDate } from "../../Common/helper";

export const CRITICAL_DAYS_COVER = 3;
export const LOW_DAYS_COVER = 7;

// Average daily consumption from a trailing window of daily stock entries.
export const computeAverageConsumption = (entries) => {
  if (!entries || entries.length === 0) {
    return 0;
  }
  const total = entries.reduce(
    (sum, entry) => sum + (Number(entry.consumed) || 0),
    0
  );
  return total / entries.length;
};

// Days of cover left at the current closing stock and average daily consumption.
export const computeDaysCover = (closingStock, averageDailyConsumption) => {
  if (!averageDailyConsumption || averageDailyConsumption <= 0) {
    return null;
  }
  return (Number(closingStock) || 0) / averageDailyConsumption;
};

// Rule engine: <3 days = critical, <7 days = low, otherwise ok/unknown.
export const getAlertLevel = (daysCover) => {
  if (daysCover === null || daysCover === undefined) {
    return "unknown";
  }
  if (daysCover < CRITICAL_DAYS_COVER) {
    return "critical";
  }
  if (daysCover < LOW_DAYS_COVER) {
    return "low";
  }
  return "ok";
};

export const ALERT_LEVEL_LABELS = {
  critical: "Critical",
  low: "Low Stock",
  ok: "OK",
  unknown: "No Data",
};

export const ALERT_LEVEL_COLORS = {
  critical: "#DD5746",
  low: "#FFA726",
  ok: "#2E7D32",
  unknown: "#808CA3",
};

export const sumConsumptionBreakdown = (consumption) => {
  if (!consumption || consumption.length === 0) {
    return 0;
  }
  return consumption.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0),
    0
  );
};
