import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateRawMaterialStockEntryById = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://localhost:8080/rawMaterialStock/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
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

export default useUpdateRawMaterialStockEntryById;
