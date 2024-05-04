import { apiSlice } from "../../app/apiSlice";

const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlbums: builder.query({
      query: () => `/admin/albums`,
      providesTags: ["Album"],
    }),
    getAlbumDetails: builder.query({
      query: (albumId) => `/admin/albums/${albumId}`,
    }),
    deleteAlbum: builder.mutation({
      query: (albumId) => ({
        url: `/admin/albums/${albumId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAlbumsQuery,
  useGetAlbumDetailsQuery,
  useDeleteAlbumMutation,
} = albumApiSlice;
