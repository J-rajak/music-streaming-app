// import { useState } from "react";
// import axios from "axios";
// // import { useParams } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// // import Loading from "../../components/Loading";
// // import ErrorMsg from "../../components/ErrorMsg";
// // import { apiSlice } from "../../app/apiSlice";

// const apiUrl = "http://localhost:4000/api/search";
// function isNotEmptyOrWhitespace(str) {
//   return /\S/.test(str);
// }
// const Search = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const handleSearchChange = async (e) => {
//     const newQuery = e.target.value;
//     if (isNotEmptyOrWhitespace(newQuery)) {
//       handleSearch(newQuery);
      
//     } else {
//       setShowResults(false);
//     }
//   };

//   const handleSearch = async (newQuery) => {
//     try {
//       const response = await axios.get(
//         `${apiUrl}?searchString=${encodeURIComponent(newQuery)}`
//       );
//       if (response.data !== null) {
//         setSearchResults(response.data);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error("Error searching for songs:", error);
//     }
//   };

//   console.log("result", searchResults, showResults);
//   return (
//     <div className="mb-8">
//       <div className="relative w-3/4 m-auto text-gray-100">
//         <input
//           className="w-full pl-10 pr-4 py-2 bg-transparent rounded-full border border-gray-600 shadow-sm focus:outline-none focus:border-gray-500"
//           type="text"
//           placeholder="Find songs on echosync..."
//           onChange={handleSearchChange}
//         />
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <BsSearch className="text-gray-400" />
//         </div>
//       </div>

//       {showResults && (
//         <div className="mt-1 flex justify-center">
//           <div className="w-2/3 bg-gray-400 rounded-md shadow-md">
//             <ul className="divide-y divide-gray-200">
//               {searchResults.map((result, index) => (
//                 <li
//                   key={index}
//                   className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
//                 >
//                   {result.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
