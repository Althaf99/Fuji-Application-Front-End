import { useQuery } from "react-query";
import axios from "axios";

const fetchInvoicesByDateRange = async ({ startDate, endDate }) => {
  const { data } = await axios.get("/api/invoices", {
    params: { startDate, endDate },
  });
  return data;
};

const useInvoicesByDateRange = ({ startDate, endDate }) => {
  return useQuery(
    ["invoicesByDateRange", startDate, endDate],
    () => fetchInvoicesByDateRange({ startDate, endDate }),
    { enabled: !!startDate && !!endDate }
  );
};

export default useInvoicesByDateRange;
