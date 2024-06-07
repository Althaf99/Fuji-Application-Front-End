import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateExcess = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://43.204.142.79:8080/excess/${id}`;

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

export default useUpdateExcess;
