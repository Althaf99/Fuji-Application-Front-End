import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteRequest = ({ requestId }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/purchaseOrder/${requestId}`;

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
