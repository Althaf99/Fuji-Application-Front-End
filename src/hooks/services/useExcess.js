import { useQuery } from "react-query";
import axios from "axios";

const useExcess = ({ itemName, itemColor, startDate, endDate }) => {
  const fetchRequest = async () => {
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
        `http://43.204.142.79:443/excess?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["excessData", itemName, itemColor, endDate], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useExcess;
