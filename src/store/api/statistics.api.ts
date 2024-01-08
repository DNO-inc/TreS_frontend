import { api } from "./api";

export const statisticsApi = api.injectEndpoints({
  endpoints: builder => ({
    getStatistics: builder.mutation({
      query: ({ body }) => ({
        url: "/statistic/general",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetStatisticsMutation } = statisticsApi;
