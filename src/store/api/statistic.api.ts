import { api } from "./api";

export const statisticApi = api.injectEndpoints({
  endpoints: builder => ({
    getSummaryActivity: builder.query({
      query: () => "/statistic/activity_summary",
    }),
    getFacultiesStatistic: builder.query({
      query: () => "/statistic/faculties",
    }),
    getPeriodStatistic: builder.query({
      query: () => "/statistic/period",
    }),
  }),
});

export const {
  useGetSummaryActivityQuery,
  useGetFacultiesStatisticQuery,
  useGetPeriodStatisticQuery,
} = statisticApi;
