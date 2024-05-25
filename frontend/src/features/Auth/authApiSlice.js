import { apiSlice } from "../../app/apiSlice";
import { updateTheme } from "../../app/themeSlice";
import { setUser, setUserId, setIsPremium, logoutUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTheme("rock"));
          dispatch(setUserId(data._id));
          dispatch(setUser(data.username));
          dispatch(setIsPremium(data.isPremium));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(updateTheme("rock"));
          dispatch(setUserId(data._id));
          dispatch(setUser(data.username));
          dispatch(setIsPremium(data.isPremium));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    loginSuccess: builder.query({
      query: () => "/auth/loginSuccess",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(updateTheme("rock"));
          dispatch(setUserId(data._id));
          dispatch(setUser(data.username));
          dispatch(setIsPremium(data.isPremium));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
          dispatch(updateTheme("pop"));
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    forgotPasswordRequest: builder.mutation({
      query: (data) => ({
        url: "/auth/requestPasswordReset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoginSuccessQuery,
  useForgotPasswordRequestMutation,
  useResetPasswordMutation,
} = authApiSlice;
