import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

const resourceData = (response) => response.data?.content ?? response.data;

const useRawMaterialStock = () => {
  const queryClient = useQueryClient();
  const queryOptions = { refetchOnWindowFocus: false };
  const useResourceQuery = (key, path) =>
    useQuery(key, () => api.get(path).then(resourceData), queryOptions);

  const vendorsQuery = useResourceQuery(
    ["rawMaterialStock", "vendors"],
    "/vendors",
  );
  const rawMaterialsQuery = useResourceQuery(
    ["rawMaterialStock", "rawMaterials"],
    "/raw-materials",
  );
  const masterBatchesQuery = useResourceQuery(
    ["rawMaterialStock", "masterBatches"],
    "/master-batches",
  );
  const grnsQuery = useResourceQuery(
    ["rawMaterialStock", "grns"],
    "/grns",
  );
  const consumptionsQuery = useResourceQuery(
    ["rawMaterialStock", "consumptions"],
    "/consumptions",
  );
  const stockQuery = useResourceQuery(
    ["rawMaterialStock", "stock"],
    "/raw-material-stock",
  );

  const mutation = useMutation(
    ({ method, path, data }) => api({ method, url: path, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("rawMaterialStock");
      },
    },
  );

  return {
    vendors: vendorsQuery.data || [],
    rawMaterials: rawMaterialsQuery.data || [],
    masterBatches: masterBatchesQuery.data || [],
    grns: grnsQuery.data || [],
    consumptions: consumptionsQuery.data || [],
    stock: stockQuery.data || [],
    isLoading:
      vendorsQuery.isLoading ||
      rawMaterialsQuery.isLoading ||
      masterBatchesQuery.isLoading ||
      grnsQuery.isLoading ||
      consumptionsQuery.isLoading ||
      stockQuery.isLoading,
    error:
      vendorsQuery.error ||
      rawMaterialsQuery.error ||
      masterBatchesQuery.error ||
      grnsQuery.error ||
      consumptionsQuery.error ||
      stockQuery.error,
    mutateAsync: mutation.mutateAsync,
    isSaving: mutation.isLoading,
  };
};

export default useRawMaterialStock;