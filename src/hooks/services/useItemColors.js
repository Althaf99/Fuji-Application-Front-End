import { useQuery } from "react-query";
import axios from "axios";

const useItemColors = () => {
  const fetchItemColor = async () => {
    try {
      const data = await axios.get("http://43.204.145.48:8080/itemColors");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["itemColors"], fetchItemColor, {
    refetchOnWindowFocus: false,
  });
};

export default useItemColors;
