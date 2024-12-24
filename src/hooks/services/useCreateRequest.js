import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateRequest = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://13.201.133.175:8080/purchaseOrder";

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

export default useCreateRequest;
