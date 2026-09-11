import { useQuery } from "react-query";
import axios from "axios";

// Fetches the who/when audit log for a single daily stock entry.
const useRawMaterialAuditTrail = ({ stockEntryId }) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/rawMaterialStock/${stockEntryId}/auditTrail`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["rawMaterialAuditTrail", stockEntryId], fetchRequest, {
    refetchOnWindowFocus: false,
    enabled: !!stockEntryId,
  });
};

export default useRawMaterialAuditTrail;
