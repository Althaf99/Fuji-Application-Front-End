import React, { forwardRef } from "react";

const money = (value) => `LKR ${Number(value || 0).toLocaleString("en-LK")}`;

const FinancePrinter = forwardRef(
  ({ transactions = [], totals = {}, period }, ref) => (
    <div
      ref={ref}
      style={{
        background: "white",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
        padding: "32px",
      }}
    >
      <style>{`@page { size: A4; margin: 14mm; } @media print { body { -webkit-print-color-adjust: exact; } }`}</style>
      <h1 style={{ color: "#162a46", marginBottom: 4 }}>Fuji Finance Report</h1>
      <p style={{ color: "#64748b", marginTop: 0 }}>
        {period} · Generated {new Date().toLocaleDateString("en-GB")}
      </p>
      <div style={{ display: "flex", gap: 28, margin: "28px 0" }}>
        <strong>
          Revenue
          <br />
          {money(totals.incomeTotal)}
        </strong>
        <strong>
          Expenses
          <br />
          {money(totals.expenseTotal)}
        </strong>
        <strong>
          Cash flow
          <br />
          {money(totals.cashFlow)}
        </strong>
        <strong>
          Receivables
          <br />
          {money(totals.outstanding)}
        </strong>
      </div>
      <table
        style={{ borderCollapse: "collapse", fontSize: 11, width: "100%" }}
      >
        <thead>
          <tr>
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
              <th
                key={heading}
                style={{
                  background: "#162a46",
                  color: "white",
                  padding: 8,
                  textAlign: "left",
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {[
                transaction.date,
                transaction.dueDate || transaction.date,
                transaction.type,
                transaction.category,
                transaction.description,
                transaction.method,
                transaction.status,
                `${transaction.type === "Income" ? "+" : "-"}${money(transaction.amount)}`,
              ].map((value, index) => (
                <td
                  key={`${transaction.id}-${index}`}
                  style={{ borderBottom: "1px solid #e5e7eb", padding: 8 }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
);

export default FinancePrinter;
