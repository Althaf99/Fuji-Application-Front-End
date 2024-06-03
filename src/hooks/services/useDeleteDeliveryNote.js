import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletDeliveryNote = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteDeliveryNoteItem = `http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/deliveryNote/${id}`;

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
