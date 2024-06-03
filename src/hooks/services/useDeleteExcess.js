import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteExcess = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/excess/${id}`;

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
