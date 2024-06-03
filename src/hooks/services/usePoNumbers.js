import { useQuery } from "react-query";
import axios from "axios";

const usePoNumbers = (onSuccess, onError) => {
  const fetchRequestNumbers = async () => {
    try {
      const data = await axios.get(
        "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/requestNumbers"
      );
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
