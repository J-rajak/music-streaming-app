import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge beautiful piano",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft music in the background",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Focus flow",
    description: "Up tempo instrument hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const spotifyPlaylistsCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge beautiful piano",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft music in the background",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Focus flow",
    description: "Up tempo instrument hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HomePage = () => {
  return (
    <div className="h-full w-full flex">
      {/** This will be the left panel  */}
      <div className="bg-zinc-600 h-full w-1/5 flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv flex items-center justify-center p-6 mb-2">
            <Icon icon="ri:netease-cloud-music-line" width="50" height="50" />
          </div>
          <div className="py-5">
            <IconText iconName={"fluent:home-48-filled"} displayText={"Home"} />
            <IconText iconName={"carbon:search"} displayText={"Search"} />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
          </div>
          <div className="pt-7">
            <IconText
              iconName={"streamline:add-square-solid"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"fluent:heart-32-filled"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>

        {/**Language div */}
        <div className="px-5">
          <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center cursor-pointer hover:border-gray-400 ">
            <Icon icon="gis:earth-america" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      {/** This will be the right panel  */}
      <div className="h-full w-4/5 bg-white overflow-auto">
        <div className="navbar w-full h-1/10 bg-zinc-600 opacity-80 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText={"Sign up"} />
              <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                Log in
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData}/>
          <PlaylistView titleText="Spotify Playlists" cardsData={focusCardsData}/>
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-black mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
        cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-80 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="piano" />
      </div>
      <div className="text-white text font-semibold py-3">{title}</div>
      <div className="text-white font-light text-sm">{description}</div>
    </div>
  );
};

export default HomePage;
