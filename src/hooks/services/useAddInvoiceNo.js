import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

const useAddInvoiceNo = ({ requestNo, invoiceDate, invoiceNo }) => {
  const QueryClient = useQueryClient();
  const useURL = `http://3.110.213.39:8080/AddInvoice/${requestNo}/${invoiceDate}/${invoiceNo}`;

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