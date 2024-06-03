import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateEmployee = () => {
  const QueryClient = useQueryClient();
  const url =
    "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/employee";

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
