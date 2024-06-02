import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteRequest = ({ requestId }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://3.110.213.39:8080/purchaseOrder/${requestId}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRequestItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("requestData");
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

export default useDeleteRequest;
