import { apiSlice } from "../../app/apiSlice";

export const songApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: ({ page, limit }) => `/api/songs?page=${page}&limit=${limit}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/api/songs/${songId}`,
      providesTags: (result, error, id) => [{ type: "Song", id }],
    }),
    getAnySong: builder.query({
      query: () => "/api/songs/any",
    }),
    getTopSongs: builder.query({
      query: (limit) => `/api/songs/top?limit=${limit}`,
    }),
    uploadSong: builder.mutation({
      query: (body) => ({
        url: "/api/users/upload/song",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    uploadAlbum: builder.mutation({
      query: (body) => ({
        url: "/api/users/upload/album",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    likeSong: builder.mutation({
      query: ({ songId }) => ({
        url: `/api/songs/${songId}/like`,
        method: "POST",
      }),
      async onQueryStarted({ songId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSongDetails", songId, (draft) => {
            const liked = draft.likes?.includes(userId);
            if (!liked) {
              draft.likes = [...draft.likes, userId];
            } else {
              draft.likes = draft.likes.filter((e) => !(e === userId));
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation({
      query: ({ songId, body }) => ({
        url: `/api/songs/${songId}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Song", id: arg.songId },
      ],
    }),
    getSongs: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/api",
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetSongDetailsQuery,
  useGetAnySongQuery,
  useGetTopSongsQuery,
  useUploadSongMutation,
  useUploadAlbumMutation,
  useLikeSongMutation,
  useAddCommentMutation,
  useGetSongsQuery,
} = songApiSlice;
