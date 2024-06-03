import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateRequest = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/purchaseOrder/${id}`;

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

export default useUpdateRequest;
