import { api } from "./api";

export const metaApi = api.injectEndpoints({
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => "/meta/get_statuses",
    }),
    getGroups: builder.query({
      query: () => "/meta/get_groups",
    }),
    getFaculties: builder.query({
      query: () => "/meta/get_faculties",
    }),
    getQueuesByFaculty: builder.mutation({
      query: ({ body }) => ({
        url: "/meta/get_queues",
        method: "POST",
        body,
      }),
    }),
    getAdmins: builder.mutation({
      query: () => ({
        url: "/meta/get_admins",
        method: "POST",
      }),
    }),
    getRoles: builder.query({
      query: () => "/meta/get_roles",
    }),
    getRolesPermissions: builder.query({
      query: () => "/meta/get_role_permissions",
    }),
  }),
});

export const {
  useGetStatusesQuery,
  useGetGroupsQuery,
  useGetFacultiesQuery,
  useGetQueuesByFacultyMutation,
  useGetAdminsMutation,
  useGetRolesQuery,
  useGetRolesPermissionsQuery,
} = metaApi;
