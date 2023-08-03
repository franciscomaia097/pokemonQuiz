import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/leaderboard/top-scores?count=10") // change the URL as per your server address
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []); // empty array as second argument to run effect only on mount

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <h1 className="text-2xl font-bold text-gray-900 p-6">Leaderboard</h1>
      <ul className="list-inside space-y-2 p-6">
        {!data || data.length === 0 ? (
          <h1>Não existem recordes</h1>
        ) : (
          <>
            <li className="border-2 border-gray-200 p-3 rounded-md flex justify-between items-center font-bold">
              <span className="w-1/3">Username</span>
              <span className="w-1/3">Score</span>
              <span className="w-1/3">Date</span>
            </li>
            {data.map((entry, index) => {
              const date = new Date(entry.date);
              const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-GB", options);
              return (
                <li
                  key={index}
                  className="border-2 border-gray-200 p-3 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700 w-1/3">
                    {entry.username}
                  </span>
                  <span className="font-bold text-blue-600 w-1/3">
                    {entry.score}
                  </span>
                  <span className="font-bold text-blue-600 w-1/3">
                    {formattedDate}
                  </span>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
