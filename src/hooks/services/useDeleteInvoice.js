import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteInvoice = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/invoice/${id}`;

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
