import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const UpgradeToPremiumPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const selectedTheme = useSelector((state) => state.theme);

  // Sample prices for yearly subscriptions
  const basicPrice = 50; // Change this to your actual price
  const premiumPrice = 100; // Change this to your actual price

  const handleSubmit = () => {

  };

  return (
    <div className="flex justify-center items-center h-screen bg-black rounded-md">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
        {isAuthenticated ? (
          <>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Basic Plan (Yearly)</span>
              <span className="text-lg font-semibold">${basicPrice}/year</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Premium Plan (Yearly)</span>
              <span className="text-lg font-semibold">
                ${premiumPrice}/year
              </span>
            </div>
            <Link to="/premium">
              <button
                className={`ml-auto bg-${selectedTheme} hover:bg-${selectedTheme}-50 text-white font-semibold py-2 px-4 rounded-full shadow-md`}
                onClick={handleSubmit}
              >
                Explore Premium
              </button>
            </Link>
          </>
        ) : (
          <p className="text-lg">Please log in to view subscription options.</p>
        )}
      </div>
    </div>
  );
};

export default UpgradeToPremiumPage;
