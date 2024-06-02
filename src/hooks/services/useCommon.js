import { useQuery } from "react-query";
import axios from "axios";

const useCommon = () => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get("http://3.110.213.39:8080/common");
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
