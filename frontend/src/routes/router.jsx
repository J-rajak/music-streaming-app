import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../features/Home/HomePage";
import PrivateRoute from "./PrivateRoute";
import PremiumRoute from "./PremiumRoute";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const ErrorPage = lazy(() => import("../components/ErrorPage"));
const SongsPage = lazy(() => import("../features/Song/SongsPage"));
const SongPage = lazy(() => import("../features/Song/SongPage"));
const UploadSongPage = lazy(() => import("../features/Premium/UploadSongPage"));
const UploadAlbumPage = lazy(() => import("../features/Premium/UploadAlbumPage"));
const PlaylistsPage = lazy(() => import("../features/Playlist/PlaylistsPage"));
const PlaylistPage = lazy(() => import("../features/Playlist/PlaylistPage"));
const AlbumsPage = lazy(() => import("../features/Album/AlbumsPage"));
const AlbumPage = lazy(() => import("../features/Album/AlbumPage"));
const ArtistesPage = lazy(() => import("../features/Artiste/ArtistesPage"));
const ArtistePage = lazy(() => import("../features/Artiste/ArtistePage"));
const UpgradeToPremiumPage = lazy(() => import("../features/Premium/UpgradeToPremiumPage"));
const FavoritesPage = lazy(() =>
  import("../features/Studio/Favorites/FavoritesPage")
);
const MyPlaylistPage = lazy(() =>
  import("../features/Studio/MyPlaylists/MyPlaylistPage")
);
const UsersPage = lazy(() => import("../features/Users/UsersPage"));
const LoginPage = lazy(() => import("../features/Auth/LoginPage"));
const SignupPage = lazy(() => import("../features/Auth/SignupPage"));
const MyProfilePage = lazy(() => import("../features/Users/MyProfilePage"));

const Router = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const selectedTheme = useSelector((state) => state.theme);
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "explore", element: <SongsPage /> },
        { path: "songs", element: <SongsPage /> },
        { path: "songs/:id", element: <SongPage /> },
        { path: "playlists", element: <PlaylistsPage /> },
        { path: "playlists/:id", element: <PlaylistPage /> },
        { path: "albums", element: <AlbumsPage /> },
        { path: "albums/:id", element: <AlbumPage /> },
        { path: "artistes", element: <ArtistesPage /> },
        { path: "artistes/:id", element: <ArtistePage /> },
        { path: "artistes/:id", element: <ArtistePage /> },
        { path: "premium/upload/song", element: <PremiumRoute component={UploadSongPage} /> },
        { path: "premium/upload/album", element: <PremiumRoute component={UploadAlbumPage} /> },
        { path: "premium", element: <UpgradeToPremiumPage /> },
        {
          path: "myProfile",
          element: <PrivateRoute component={MyProfilePage} />,
        },
        {
          path: "favorites",
          element: <PrivateRoute component={FavoritesPage} />,
        },
        {
          path: "myPlaylist",
          element: <PrivateRoute component={MyPlaylistPage} />,
        },
        {
          path: "users/:id",
          element: <UsersPage />,
        },
        {
          path: "login",
          element: !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to="/" replace />
          ),
        },
        {
          path: "signup",
          element: !isAuthenticated ? (
            <SignupPage />
          ) : (
            <Navigate to="/" replace />
          ),
        },
      ],
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="p-4 md:text-xl">
          <AiOutlineLoading3Quarters
            className={`animate-spin m-auto text-${selectedTheme}-50`}
          />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
