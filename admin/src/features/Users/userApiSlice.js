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
        url: "",
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
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
} = userApiSlice;
