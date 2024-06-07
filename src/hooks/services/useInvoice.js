import { useQuery } from "react-query";
import axios from "axios";

const useInvoice = ({
  itemName,
  itemColor,
  requestNumber,
  requestDate,
  invoiceNo,
  startDate,
  endDate,
}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
    if (requestNumber) {
      query.append("po", requestNumber);
    }
    if (requestDate) {
      query.append("poDate", requestDate);
    }
    if (invoiceNo) {
      query.append("invoiceNo", invoiceNo);
    }

    if (startDate) {
      query.append("startDate", startDate);
    }
    if (endDate) {
      query.append("endDate", endDate);
    }
    try {
      const data = await axios.get(
        `http://43.204.142.79:8080/invoiceList?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    [
      "invoiceData",
      itemName,
      itemColor,
      requestNumber,
      invoiceNo,
      requestDate,
      endDate,
    ],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useInvoice;
