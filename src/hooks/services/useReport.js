import { useQuery } from "react-query";
import axios from "axios";

const useReport = () => {
  const fetchItemColor = async () => {
    try {
      const data = await axios.get("http://localhost:8080/merged");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["report"], fetchItemColor, {
    refetchOnWindowFocus: false,
  });
};

export default useReport;
