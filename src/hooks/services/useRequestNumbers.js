import { useQuery } from "react-query";
import axios from "axios";

const useRequestNumbers = () => {
  const fetchColors = async () => {
    try {
      const data = await axios.get("http://43.204.142.79:443/requestNumbers");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["requestNumbers"], fetchColors, {
    refetchOnWindowFocus: false,
  });
};

export default useRequestNumbers;
