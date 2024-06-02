import { useQuery } from "react-query";
import axios from "axios";

const useInvoiceByInvoiceNo = ({ invoiceNo }) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(
        `http://3.110.213.39:8080/invoice/${invoiceNo}`
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
