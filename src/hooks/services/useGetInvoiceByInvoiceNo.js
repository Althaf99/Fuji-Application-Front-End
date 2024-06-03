import { useQuery } from "react-query";
import axios from "axios";

const useInvoiceByInvoiceNo = ({ invoiceNo }) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(
        `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/invoice/${invoiceNo}`
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
