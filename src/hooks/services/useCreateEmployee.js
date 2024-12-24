import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateEmployee = () => {
  const QueryClient = useQueryClient();
  const url = "http://13.201.133.175:8080/employee";

  return useMutation(
    async (obj) => await axios.post(url, obj),
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

export default useCreateEmployee;
