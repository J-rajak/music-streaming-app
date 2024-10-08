import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/admin/users/profile",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: "/admin/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/admin/users/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/admin/users/",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/admin/users/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    postPlan: builder.mutation({
      query: (data) => ({
        url: `/admin/users/create/plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getPlans: builder.query({
      query: () => `/admin/users/plans`,
    }),
    getPlanById: builder.query({
      query: (id) => ({ url: `/admin/users/plan/${id}` }),
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `/admin/users/plan/${data.planId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),
    deletePlan: builder.mutation({
      query: (planId) => ({
        url: `/admin/users/plan/${planId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetUserProfileQuery,
  useProfileMutation,
  useUploadImageMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  usePostPlanMutation,
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = userApiSlice;
