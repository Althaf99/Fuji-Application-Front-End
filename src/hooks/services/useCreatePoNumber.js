import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreatePoNumber = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://43.204.145.48:8080/requestNumbers";

  return useMutation(
    async (obj) => await axios.post(projectUrl, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries("poNumberList");
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useCreatePoNumber;
