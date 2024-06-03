import { useQuery } from "react-query";
import axios from "axios";

const useItemColors = () => {
  const fetchItemColor = async () => {
    try {
      const data = await axios.get(
        "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/itemColors"
      );
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
