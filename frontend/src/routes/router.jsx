import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import AdminLayout from "../components/admin/AdminLayout";
import HomePage from "../features/Home/HomePage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const ErrorPage = lazy(() => import("../components/ErrorPage"));
const SongsPage = lazy(() => import("../features/Song/SongsPage"));
const SongPage = lazy(() => import("../features/Song/SongPage"));
const PlaylistsPage = lazy(() => import("../features/Playlist/PlaylistsPage"));
const PlaylistPage = lazy(() => import("../features/Playlist/PlaylistPage"));
const AlbumsPage = lazy(() => import("../features/Album/AlbumsPage"));
const AlbumPage = lazy(() => import("../features/Album/AlbumPage"));
const ArtistesPage = lazy(() => import("../features/Artiste/ArtistesPage"));
const ArtistePage = lazy(() => import("../features/Artiste/ArtistePage"));
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

// admin pages
const AdminDashboard = lazy(() => import("../features/admin/AdminDashboard"));
const AdminSongPage = lazy(() => import("../features/admin/AdminSongPage"));
const AdminAlbumPage = lazy(() => import("../features/admin/AdminAlbumPage"));
const AdminArtistePage = lazy(() =>
  import("../features/admin/AdminArtistePage")
);
const AdminEditUserPage = lazy(() =>
  import("../features/admin/AdminEditUserPage")
);

const Router = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  const selectedTheme = useSelector((state) => state.theme);
  const router = createBrowserRouter([
    {
      element: isAdmin ? <AdminLayout /> : <Layout />,
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
        {
          path: "admin",
          element: <AdminRoute component={AdminDashboard} />,
        },
        {
          path: "admin/editUser/:id",
          element: <AdminRoute component={AdminEditUserPage} />,
        },
        {
          path: "admin/songs",
          element: <AdminRoute component={AdminSongPage} />,
        },
        {
          path: "admin/albums",
          element: <AdminRoute component={AdminAlbumPage} />,
        },
        {
          path: "admin/artistes",
          element: <AdminRoute component={AdminArtistePage} />,
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
