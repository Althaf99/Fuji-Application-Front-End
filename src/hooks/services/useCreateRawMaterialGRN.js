import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateRawMaterialGRN = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/rawMaterialGRN";

  return useMutation(
    async (obj) => await axios.post(url, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries("rawMaterialGRNData");
        QueryClient.invalidateQueries("rawMaterialStockData");
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useCreateRawMaterialGRN;
