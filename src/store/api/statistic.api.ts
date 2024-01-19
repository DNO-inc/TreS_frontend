import { api } from "./api";

export const statisticApi = api.injectEndpoints({
  endpoints: builder => ({
    getSummaryActivity: builder.query({
      query: () => "/statistic/activity_summary",
    }),
    getFacultyStatistic: builder.query({
      query: () => "/statistic/faculties",
    }),
    getGeneralStatistic: builder.mutation({
      query: ({ body }) => ({
        url: "/statistic/period",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetSummaryActivityQuery,
  useGetFacultyStatisticQuery,
  useGetGeneralStatisticMutation,
} = statisticApi;
