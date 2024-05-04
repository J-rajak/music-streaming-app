import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import PremiumCard from "../../components/PremiumCard";

const SubscriptionsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <div className="">
            <Link to="/plans">
              <button
                className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
              >
                <FaPlus className="text-xs mr-2" />
                create plan
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center text-zinc-800 mt-10">
          <PremiumCard />
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;
