import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateRequest = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://localhost:8080/purchaseOrder/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries("requestData");
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useUpdateRequest;
