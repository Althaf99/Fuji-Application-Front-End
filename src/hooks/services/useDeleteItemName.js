import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteItemName = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://43.204.142.79:443/itemNames/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteInvoiceItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries(["itemNames"]);
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

export default useDeleteItemName;
