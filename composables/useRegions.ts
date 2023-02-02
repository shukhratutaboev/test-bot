import Response from "@/types/response.types";
const url = "api/regions";

interface IRegion {
  id: number;
  name: string;
}

export const useRegions = () => {
  const regionId = useState("regionId", () => "0");
  const regionsList = useState("regionsList", (): IRegion[] => []);
  if (process.client) {
    regionId.value = localStorage.getItem("regionId") || "";
  }

  function setRegionId(id: string) {
    regionId.value = id;
    if (process.client) {
      localStorage.setItem("regionId", id);
    }
  }

  const selectedRegion = computed(() => {
    return regionsList.value?.find((v: IRegion) => +v.id === +regionId.value);
  });

  const fetchRegions = async (isLangChanged = false) => {
    if (!isLangChanged && regionsList.value?.length) return regionsList.value;

    const res = (await useMyFetch(url)) as Response;

    if (Array.isArray(res?.items)) {
      regionsList.value = res?.items?.sort(
        (a: IRegion, b: IRegion) => a.id - b.id
      );
    }

    return regionsList.value;
  };

  async function getById(id: number) {
    const res = (await useMyFetch(`${url}/${id}`)) as Response;
    return res.items;
  }
  return {
    fetchRegions,
    getById,
    selectedRegion,
    setRegionId,
  };
};
