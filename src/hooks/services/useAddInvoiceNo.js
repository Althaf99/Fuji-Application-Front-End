import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

const useAddInvoiceNo = ({ requestNo, invoiceDate, invoiceNo }) => {
  const QueryClient = useQueryClient();
  const useURL = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/AddInvoice/${requestNo}/${invoiceDate}/${invoiceNo}`;

  return useMutation(
    (obj) => axios.put(useURL, JSON.stringify(obj)).then((x) => x.json()),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries();
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useAddInvoiceNo;
