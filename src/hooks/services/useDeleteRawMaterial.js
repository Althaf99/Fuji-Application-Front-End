import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteRawMaterial = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://localhost:8080/rawMaterials/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRequestItem, JSON.stringify(obj)).then(() => {
        QueryClient.invalidateQueries("rawMaterialsData");
      }),
    {
      onSuccess: async () => {},
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeleteRawMaterial;
