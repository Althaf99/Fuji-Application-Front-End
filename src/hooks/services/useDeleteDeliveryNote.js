import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletDeliveryNote = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteDeliveryNoteItem = `http://43.204.145.48:8080/deliveryNote/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteDeliveryNoteItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("deliveryNoteData");
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

export default useDeletDeliveryNote;
