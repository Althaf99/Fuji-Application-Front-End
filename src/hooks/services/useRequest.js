import { useQuery } from "react-query";
import axios from "axios";

const useRequest = ({
  itemName,
  itemColor,
  requestNumber,
  startDate,
  endDate,
}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
    if (requestNumber) {
      query.append("po", requestNumber);
    }
    if (startDate) {
      query.append("startDate", startDate);
    }

    if (endDate) {
      query.append("endDate", endDate);
    }
    try {
      const data = await axios.get(
        `http://43.204.142.79:443/purchaseOrder?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["requestData", itemName, itemColor, requestNumber, endDate],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useRequest;
