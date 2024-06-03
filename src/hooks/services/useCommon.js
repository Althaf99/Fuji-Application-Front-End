import { useQuery } from "react-query";
import axios from "axios";

const useCommon = () => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(
        "http://ec2-13-233-90-251.ap-south-1.compute.amazonaws.com:8080/common"
      );
      return data?.data[0];
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["commonData"], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useCommon;
