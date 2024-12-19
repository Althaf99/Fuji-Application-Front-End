import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import SideNavBar from "../SideNavBar";
import ListPurchaseOrder from "../../pages/PurchaseOrder/ListPurchaseOrder";
import ListInvoice from "../../pages/Invoice/List-Invoice";
import ListDeliveryNote from "../../pages/DeliveryNote/List-DeliveryNote";
import ListStock from "../../pages/Stock/ListStock";

import { InvoicePrinter } from "../../components/Printers/InvoicePrinter";
import { DeliveryNotePrinter } from "../../components/Printers/DeliveryNotePrinter";

import AddItems from "../../pages/AddItems";
import ListExcess from "../../pages/Excess";
import Dashboard from "../../pages/Dashboard";
import LoginForm from "../../pages/Login";

import { ExcessSheetPrinter } from "../Printers/ExcessSheetPrinter";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginForm />} />
        <Route path="/" element={<SideNavBar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="purchaseOrder" element={<ListPurchaseOrder />} />
          <Route path="invoice" element={<ListInvoice />} />
          <Route path="invoicePrinter" element={<InvoicePrinter />} />
          <Route path="deliveryNote" element={<ListDeliveryNote />} />
          <Route path="deliveryNotePrinter" element={<DeliveryNotePrinter />} />
          <Route path="addItems" element={<AddItems />} />
          <Route path="excess" element={<ListExcess />} />
          <Route path="stock" element={<ListStock />} />
          <Route path="excessSheetPrinter" element={<ExcessSheetPrinter />} />
        </Route>
      </>
    )
  );
  return { router };
};

export { AppRouter };
