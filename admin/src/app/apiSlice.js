import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logoutUser } from "../features/Auth/authSlice";
const baseURL = import.meta.env.VITE_ECHOSYNC_BACKEND;

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logoutUser());
  }
  console.log(result);
  if (
    result.error &&
    (result.error.status === 401 || result.error.originalStatus === 401)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "admin/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result.error && result.error.status === 400) {
    console.error("Bad request", result.error.message);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Playlist", "Song"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
