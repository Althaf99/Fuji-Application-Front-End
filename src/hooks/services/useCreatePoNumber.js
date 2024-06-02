import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreatePoNumber = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://3.110.213.39:8080/requestNumbers";

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