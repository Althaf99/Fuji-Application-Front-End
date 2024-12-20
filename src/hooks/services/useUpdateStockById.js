import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateStockById = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://localhost:8080/stock/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries("stockData");    
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useUpdateStockById;