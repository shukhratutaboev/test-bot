import Response from "@/types/response.types";
import { IOrganization, IOrgSeller } from "~~/types/organization.types";

const url = "api/organizations";

export const useOrganization = () => {
  const fetch = async (params: any = {}) => {
    return (await useMyFetch(url, { params })) as Response<IOrganization>;
  };

  const getInfoAboutSeller = async (orgId: number | string) => {
    return (await useMyFetch(
      `${url}/${orgId}/contact`
    )) as Response<IOrgSeller>;
  };

  return {
    fetch,
    getInfoAboutSeller,
  };
};
