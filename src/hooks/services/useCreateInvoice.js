import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateInvoice = () => {
  const QueryClient = useQueryClient();
  const projectUrl =
    "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/invoice";

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
