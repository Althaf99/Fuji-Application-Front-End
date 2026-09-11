import { useQuery } from "react-query";
import axios from "axios";

const useRawMaterialGRN = ({ materialId, startDate, endDate } = {}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (materialId) {
      query.append("materialId", materialId);
    }
    if (startDate) {
      query.append("startDate", startDate);
    }
    if (endDate) {
      query.append("endDate", endDate);
    }

    try {
      const data = await axios.get(
        `http://localhost:8080/rawMaterialGRN?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["rawMaterialGRNData", materialId, startDate, endDate],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useRawMaterialGRN;
