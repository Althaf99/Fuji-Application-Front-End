import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateItemName = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://3.110.213.39:8080/itemNames";

  return useMutation(
    async (obj) => await axios.post(projectUrl, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries(["itemNames"]);
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useCreateItemName;
