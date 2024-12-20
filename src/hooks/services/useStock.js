import { useQuery } from "react-query";
import axios from "axios";

const useStock = ({
  itemName,
  itemColor,
}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
   
    try {
      const data = await axios.get(
        `http://localhost:8080/stock?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    [
      "stockData",
      itemName,
      itemColor,
    ],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useStock;
