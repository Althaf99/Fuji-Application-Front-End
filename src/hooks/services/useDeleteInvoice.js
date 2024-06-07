import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteInvoice = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://43.204.142.79:443/invoice/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteInvoiceItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("invoiceData");
        x.json();
      }),
    {
      onSuccess: async () => {},
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeleteInvoice;
