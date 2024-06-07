import { useQuery } from "react-query";
import axios from "axios";

const useDeliveryNote = ({ itemName, itemColor, startDate, endDate }) => {
  const fetchDeliveryNote = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
    if (startDate) {
      query.append("startDate", startDate);
    }
    if (endDate) {
      query.append("endDate", endDate);
    }
    try {
      const data = await axios.get(
        `http://43.204.142.79:8080/deliveryNote?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["deliveryNoteData", itemName, itemColor, endDate],
    fetchDeliveryNote,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useDeliveryNote;
