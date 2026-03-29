import { useQuery } from "react-query";
import axios from "axios";

const useInvoice = ({
  itemName,
  itemColor,
  requestNumber,
  invoiceNo,
  requestDate,
  endDate,
  startDate
}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) query.append("itemName", itemName);
    if (itemColor) query.append("itemColor", itemColor);
    if (requestNumber) query.append("po", requestNumber);
    if (invoiceNo) query.append("invoiceNo", invoiceNo);
    if (requestDate) query.append("poDate", requestDate);
    if (endDate) query.append("endDate", endDate);
    if (startDate) query.append("startDate", startDate);

    const response = await axios.get( `http://localhost:8080/invoiceList?${query.toString()}`);
    return response.data;
  };

  // Use the dependencies in the query key to trigger re-fetching
  return useQuery(
    ["invoices", itemName, itemColor, requestNumber, invoiceNo, requestDate, endDate, startDate],
    fetchRequest,
    {
      enabled: !!(itemName || itemColor || requestNumber || invoiceNo || requestDate || endDate), // Ensure at least one dependency is truthy
    }
  );
};

export default useInvoice;