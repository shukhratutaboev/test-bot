import Response from "@/types/response.types";

export const useMyFetch = (url: string, options?: Object) => {
  const { baseURL } = useRuntimeConfig();
  const cookie = useMyCookie();

  return $fetch(url, {
    ...(options && { ...options }),
    baseURL,
    headers: {
      // ...useRequestHeaders(),
      Authorization: "Bearer " + cookie.getAccessToken(),
      Language: cookie.getLocale(),
    },
    async onResponse({ request, response, options }) {
      const metaData = JSON.parse(response.headers.get("x-pagination") || "[]");

      const result =
        response._data?.result?.orders ||
        response._data?.result?.files ||
        response._data?.result?.responses ||
        response._data?.result?.passportTypes ||
        response._data?.result?.regions ||
        response._data?.result?.districts ||
        response._data?.result?.items ||
        response._data?.result?.item ||
        response._data?.result ||
        response._data?.items ||
        response._data?.item ||
        response._data?.data ||
        response._data?.data?.data ||
        (response._data?.error ? null : response._data);

      response._data = <Response>{
        totalCount: metaData?.TotalCount || 0,
      };

      if (Array.isArray(result)) {
        response._data.items = result || null;
      } else {
        response._data.item = result || null;
      }
    },
    async onResponseError() {},
    async onRequest({ request, options }) {},
    async onRequestError({ request, options, error }) {},
  }).catch<Response>((error) => {
    if (options?.passError) {
      return Promise.reject(error);
    }
    let message = null;
    const status = error?.status || 500;

    if (status === 401) {
      message = "401 Unauthorized";
    } else if (status?.toString()?.slice(0, 1) === 5) {
      message = "Internal Server Error";
    } else if (status === 405) {
      message = "Method Not Allowed";
    } else if (status === 404) {
      message = "404 Method Not Found";
    } else if (status === 403) {
      message = "403 Forbidden";
    } else {
      // message = message ?? t("Unknown_error_occurred_in_backend");
      message = message ?? "Unknown_error_occurred_in_backend";
    }
    const res = {
      items: null,
      item: null,
      totalCount: 0,
      error: {
        status,
        message,
      },
    };

    return res;
  });
};
