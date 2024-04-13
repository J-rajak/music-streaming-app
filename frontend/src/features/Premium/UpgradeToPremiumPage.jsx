import { useSelector } from "react-redux";

const UpgradeToPremiumPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const selectedTheme = useSelector((state) => state.theme);

  // Sample prices for yearly subscriptions
  const premiumPrice = 100; // Change this to your actual price

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center h-screen bg-black rounded-md">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
        {isAuthenticated && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Premium Features:</h3>
              <ul className="list-disc pl-6">
                <li>Become an artiste</li>
                <li>Upload songs</li>
                <li>Upload albums</li>
              </ul>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Premium Plan (Yearly)</span>
              <span className="text-lg font-semibold">
                Rs. {premiumPrice}/year
              </span>
            </div>
            <button
              className={`ml-auto bg-${selectedTheme} hover:bg-${selectedTheme}-50 text-white font-semibold py-2 px-4 rounded-full shadow-md`}
              onClick={handleSubmit}
            >
              pay via khalti
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpgradeToPremiumPage;
