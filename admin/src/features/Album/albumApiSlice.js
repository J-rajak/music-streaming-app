import { apiSlice } from "../../app/apiSlice";

const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlbums: builder.query({
      query: () => `/admin/albums`,
    }),
    getAlbumDetails: builder.query({
      query: (albumId) => `/admin/albums/${albumId}`,
    }),
  }),
});

export const {
  useGetAllAlbumsQuery,
  useGetAlbumDetailsQuery,
} = albumApiSlice;
