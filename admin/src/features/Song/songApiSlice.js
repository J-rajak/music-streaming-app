import { apiSlice } from "../../app/apiSlice";

export const songApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: ({ page, limit }) => `/admin/songs?page=${page}&limit=${limit}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/admin/songs/${songId}`,
      providesTags: (result, error, id) => [{ type: "Song", id }],
    }),
    deleteSong: builder.mutation({
      query: (songId) => ({
        url: `/admin/songs/${songId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetSongDetailsQuery,
  useDeleteSongMutation,
} = songApiSlice;
