import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    getCurrentUser: builder.query({
      query: () => `/api/users/currentUser`,
      providesTags: ["User"],
    }),
    editUserDetails: builder.mutation({
      query: (data) => ({
        url: "/api/users/edit",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/api/users/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getPlans: builder.query({
      query: () => `/api/users/plans`,
    }),
    freeSubscription: builder.mutation({
      query: (freePlanId) => ({
        url: `api/users/subscribe/${freePlanId}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    paidSubscription: builder.mutation({
      query: (paidPlanId) => ({
        url: `api/users/subscribe/${paidPlanId}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: `api/users/unSubscribe`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetCurrentUserQuery,
  useEditUserDetailsMutation,
  useUploadImageMutation,
  useGetPlansQuery,
  useFreeSubscriptionMutation,
  usePaidSubscriptionMutation,
  useCancelSubscriptionMutation,
} = userApiSlice;
