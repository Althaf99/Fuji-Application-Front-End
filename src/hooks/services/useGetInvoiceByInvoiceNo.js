import { useQuery } from "react-query";
import axios from "axios";

const useInvoiceByInvoiceNo = ({ invoiceNo }) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(
        `http://43.204.142.79:8080/invoice/${invoiceNo}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["invoiceData", invoiceNo], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useInvoiceByInvoiceNo;
