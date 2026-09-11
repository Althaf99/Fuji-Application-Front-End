import { useQuery } from "react-query";
import axios from "axios";

// Fetches daily stock entries, optionally scoped to a material and/or date range.
const useRawMaterialStock = ({
  materialId,
  startDate,
  endDate,
  date,
} = {}) => {
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
    if (date) {
      query.append("date", date);
    }

    try {
      const data = await axios.get(
        `http://localhost:8080/rawMaterialStock?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["rawMaterialStockData", materialId, startDate, endDate, date],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
      enabled: !!(materialId || startDate || endDate || date),
    }
  );
};

export default useRawMaterialStock;
