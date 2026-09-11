import { useQuery } from "react-query";
import axios from "axios";

const useRawMaterials = ({ name, category } = {}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (name) {
      query.append("name", name);
    }
    if (category) {
      query.append("category", category);
    }

    try {
      const data = await axios.get(
        `http://localhost:8080/rawMaterials?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["rawMaterialsData", name, category], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useRawMaterials;
