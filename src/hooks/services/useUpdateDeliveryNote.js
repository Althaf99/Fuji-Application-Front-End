import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateDeliveryNote = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://localhost:8080/deliveryNote/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
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

export default useUpdateDeliveryNote;
