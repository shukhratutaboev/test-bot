import Response from "@/types/response.types";

const url = "api/orders";

export const useOrders = () => {
  const fetch = async (params: any) => {
    const res = (await useMyFetch(url, { params })) as Response;
    return res.items;
  };
  const create = async (data: Object) => {
    const res = (await useMyFetch(url, {
      body: data,
      method: "POST",
    })) as Response;
    return res;
  };

  async function getById(id: number | string) {
    const res = (await useMyFetch(`${url}/${id}`)) as Response;
    return res.items;
  }

  return {
    fetch,
    getById,
    create,
  };
};
