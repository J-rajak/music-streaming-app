import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Player from "../features/MusicPlayer/Player";
import LoginModal from "./LoginModal";

const Layout = () => {
  const { currentSong } = useSelector((state) => state.player);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-primary">
      <div className="grid grid-cols-5 grid-rows-[1fr,auto,88]">
        <aside
          className={`col-span-5 md:col-span-1 md:sticky md:top-0 md:h-screen overflow-y-auto bg-primary text-white ${
            currentSong && "md:pb-[88px]"
          }`}
        >
          <NavBar />
        </aside>
        <main
          className={`col-span-5 md:col-span-4 grid grid-rows-[1fr,auto] ${
            currentSong && "pb-[88px]"
          }`}
        >
          <div className="bg-secondary-200 row-span-1 min-h-screen overflow-y-auto p-4 md:p-8">
            <Outlet />
          </div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
          />
        </main>
      </div>
      {isAuthenticated && (
        <div
          className={`fixed z-40 bottom-0 left-0 right-0 transition-all ease-in-out ${
            !currentSong && "hidden"
          }`}
        >
          <Player />
        </div>
      )}
      <LoginModal />
    </div>
  );
};

export default Layout;
