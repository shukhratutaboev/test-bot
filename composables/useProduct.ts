import Response from "@/types/response.types";
import { IProduct } from "~~/types/product.types";

const url = "api/products";

export const useProduct = () => {
  const productsTotalCount = useState("productsTotalCount", () => 0);

  const fetch = async (params: any) => {
    const res = (await useMyFetch(url, { params })) as Response<IProduct>;
    productsTotalCount.value = res.totalCount || 0;

    return res;
  };

  async function getById(id: number | string) {
    return (await useMyFetch(`${url}/${id}`)) as Response<IProduct>;
  }
  const getAllCount = async (params: any) => {
    const res = (await useMyFetch(url, { params })) as Response<IProduct>;
    return res.totalCount || 0;
  };
  return {
    fetch,
    getById,
    getAllCount,
  };
};
