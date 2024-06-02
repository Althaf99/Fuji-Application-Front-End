import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateInvoice = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://3.110.213.39:8080/invoice";

  return useMutation(
    async (obj) => await axios.post(projectUrl, obj),
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

export default useCreateInvoice;
