import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateRawMaterialStockEntry = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/rawMaterialStock";

  return useMutation(
    async (obj) => await axios.post(url, obj),
    {
      onSuccess: async () => {
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

export default useCreateRawMaterialStockEntry;
