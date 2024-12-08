import { useQuery } from "react-query";
import axios from "axios";

const usePoNumbers = (onSuccess, onError) => {
  const fetchRequestNumbers = async () => {
    try {
      const data = await axios.get("http://localhost:8080/requestNumbers");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery("poNumberList", fetchRequestNumbers, {
    onSuccess,
    onError,
  });
};

export default usePoNumbers;
