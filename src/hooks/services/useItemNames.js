import { useQuery } from "react-query";
import axios from "axios";

const useItemNames = (onSuccess, onError) => {
  const fetchItemNames = async () => {
    try {
      const data = await axios.get(
        "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/itemNames"
      );
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
