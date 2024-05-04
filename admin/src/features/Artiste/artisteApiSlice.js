import { apiSlice } from "../../app/apiSlice";

const artisteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtistes: builder.query({
      query: (limit) => `/admin/artistes?limit=${limit}`,
    }),
    getArtisteDetails: builder.query({
      query: (artisteId) => `/admin/artistes/${artisteId}`,
    }),
    deleteArtiste: builder.mutation({
      query: (artisteId) => ({
        url: `/admin/artistes/${artisteId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllArtistesQuery,
  useGetArtisteDetailsQuery,
  useDeleteArtisteMutation,
} = artisteApiSlice;
