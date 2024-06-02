import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteItemColor = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://3.110.213.39:8080/itemColors/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteInvoiceItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries(["itemColors"]);
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

export default useDeleteItemColor;
