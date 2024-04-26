import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ArtisteSongList = ({ songs }) => {
  const selectedTheme = useSelector((state) => state.theme);

  const [checkedSongs, setCheckedSongs] = useState({});

  const handleCheckboxChange = (e, songId) => {
    const isChecked = e.target.checked;
    setCheckedSongs((prevCheckedSongs) => ({
      ...prevCheckedSongs,
      [songId]: isChecked,
    }));
  };

  return (
    <ul>
      {songs.map((song) => (
        <li
          key={song._id}
          className="grid grid-cols-6 md:grid-cols-12 items-center justify-between gap-4 w-full rounded-md p-4 bg-white"
        >
          <div className="col-span-2 md:col-span-8 flex flex-col gap-1 items-start truncate ...">
            <>
              <Link
                to={`/songs/${song._id}`}
                className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
              >
                {song.title}
              </Link>
              <Link
                to={`/artistes/${song.artiste._id}`}
                className={`text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
              >
                {song.artiste.name}
              </Link>
            </>
          </div>
          <div className="col-span-3 justify-end items-center flex gap-2 sm:gap-4">
            <span className="col-span-1 text-end">{song.duration}</span>
            <div className="col-span-1 text-end">
              {/* Checkbox */}
              <label
                htmlFor="toggleCheckbox"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`toggleCheckbox-${song._id}`}
                  className="form-checkbox h-5 w-5 text-red-500"
                  checked={checkedSongs[song._id] || false}
                  onChange={(e) => handleCheckboxChange(e, song._id)}
                />
                <span className="ml-2 text-sm text-black">add</span>
              </label>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArtisteSongList;
