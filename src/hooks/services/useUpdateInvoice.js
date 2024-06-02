import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateInvoice = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://43.204.145.48:8080/invoice/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
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

export default useUpdateInvoice;
