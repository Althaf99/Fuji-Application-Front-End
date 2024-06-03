import { useQuery } from "react-query";
import axios from "axios";

const useRequestNumbers = () => {
  const fetchColors = async () => {
    try {
      const data = await axios.get(
        "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/requestNumbers"
      );
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
