import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    getAllUsers: builder.query({
      query: () => `api/users/admin/getUsers`,
      providesTags: ["Users"],
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
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useEditUserDetailsMutation,
  useUploadImageMutation,
} = userApiSlice;
