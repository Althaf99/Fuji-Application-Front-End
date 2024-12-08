import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletePoNumber = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://localhost:8080/requestNumbers/${id}`;

  return useMutation(
    async (obj) =>
      await axios.delete(deleteInvoiceItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("poNumberList");
        x.json();
      }),
    {
      onSuccess: async () => {
        console.log("Success");
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeletePoNumber;
