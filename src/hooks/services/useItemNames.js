import { useQuery } from "react-query";
import axios from "axios";

const useItemNames = (onSuccess, onError) => {
  const fetchItemNames = async () => {
    try {
      const data = await axios.get("http://43.204.142.79:443/itemNames");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["itemNames"], fetchItemNames, {
    refetchOnWindowFocus: false,
  });
};

export default useItemNames;
