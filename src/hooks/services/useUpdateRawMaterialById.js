import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUpdateRawMaterialById = ({ id }) => {
  const QueryClient = useQueryClient();
  const url = `http://localhost:8080/rawMaterials/${id}`;

  return useMutation(
    async (obj) => await axios.put(url, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries("rawMaterialsData");
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useUpdateRawMaterialById;
