import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteStock = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://13.201.133.175:8080/stock/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRequestItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("stockData");
        x.json();
      }),
    {
      onSuccess: async () => {},
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeleteStock;
