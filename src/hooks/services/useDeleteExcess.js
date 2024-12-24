import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteExcess = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://13.201.133.175:8080/excess/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteInvoiceItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("excessData");
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

export default useDeleteExcess;
