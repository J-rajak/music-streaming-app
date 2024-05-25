import { apiSlice } from "../../app/apiSlice";

const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query({
      query: (limit) => `/admin/playlists?limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Playlist", id: _id })),
              { type: "Playlist", id: "LIST" },
            ]
          : [{ type: "Playlist", id: "LIST" }],
    }),
    getPlaylistDetails: builder.query({
      query: (playlistId) => `/admin/playlists/${playlistId}`,
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),
    deletePlaylist: builder.mutation({
      query: (playlistId) => ({
        url: `/admin/playlists/${playlistId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPlaylistsQuery,
  useGetPlaylistDetailsQuery,
  useDeletePlaylistMutation,
} = playlistApiSlice;
