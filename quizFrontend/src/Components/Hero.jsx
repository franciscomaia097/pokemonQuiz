// components/Hero.jsx
import { Oval } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
import { fetchRandomPokemonData } from "../api/fetchRandomPokemon";

const Hero = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsImageLoading(true);

    fetchRandomPokemonData(3)
      .then((data) => {
        setPokemonData(data);
        setIsImageLoading(false);
        setIsLoading(false);
        setShowAlert(false); // Reset the alert state
        setIsCorrect(false); // Reset the correct state
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to check if the game is over (10 guesses reached)
  useEffect(() => {
    if (guessCount === 10) {
      setShowAlert(true);
    }
  }, [guessCount]);

  if (isLoading || isImageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval color="#000000" height={80} width={80} />
      </div>
    );
  }

  // Randomize the order of the options
  const shuffledOptions = shuffleArray([
    { name: pokemonData[0].name, id: 0 },
    { name: pokemonData[1].name, id: 1 },
    { name: pokemonData[2].name, id: 2 },
  ]);

  // Function to handle button click and check if the name is correct
  const handleButtonClick = async (clickedName) => {
    let newGuessCount = guessCount;
    if (clickedName === pokemonData[0].name) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
    setShowAlert(true);
    newGuessCount++;
    setGuessCount(newGuessCount);

    // Using setTimeout to add a delay before loading new Pokemon
    setTimeout(() => {
      if (newGuessCount < 10) {
        loadNewPokemon();
      }
    }, 0); // 1 second delay
  };

  // Function to load a new Pokémon to guess
  const loadNewPokemon = () => {
    if (guessCount < 10) {
      setIsImageLoading(true);
      fetchRandomPokemonData(3)
        .then((data) => {
          setPokemonData(data);
          setIsImageLoading(false);
          setShowAlert(false); // Reset the alert state
          setIsCorrect(false); // Reset the correct state
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setGuessCount(0);
    setScore(0);
    setShowAlert(false);
    setIsCorrect(false);
    setIsSubmitted(false);
    setUsername("");
    fetchRandomPokemonData(3)
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  };

  // Function to handle form submission for leaderboard
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (username.trim() === "") {
      alert("Please enter a username.");
      return;
    }
    // Create a new entry for the leaderboard
    const newEntry = {
      username: username,
      score: score,
    };
    // Update the leaderboard state with the new entry
    fetch("http://localhost:8080/api/leaderboard/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Score saved successfully:", data.message); // access the message property of data
        // Update the leaderboard state with the new entry
        // Reset the username input
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error saving score:", error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8">Quem é este pokemon?</h1>

      {guessCount < 10 && (
        <>
          <div className="mt-4">
            <img
              src={pokemonData[0].image}
              alt={pokemonData[0].name}
              className="w-64 h-64 object-contain"
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
          <div className="mt-8">
            {/* Display the options in the randomized order */}
            {!isImageLoading &&
              shuffledOptions.map((option) => (
                <button
                  key={option.id}
                  className="bg-blue-500 text-white rounded px-4 py-2 mx-2"
                  onClick={() => handleButtonClick(option.name)}
                  disabled={isImageLoading && guessCount >= 10}
                >
                  {option.name}
                </button>
              ))}
          </div>
        </>
      )}
      {showAlert && (
        <div className="mt-4">
          {guessCount < 10 ? (
            <p className={isCorrect ? "text-green-500" : "text-red-500"}>
              {isCorrect ? "Correct!" : "Wrong!"}
            </p>
          ) : (
            <p className="text-xl font-bold text-center">Game Over!</p>
          )}
          {guessCount === 10 && (
            <div className="mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p className="text-xl font-bold mt-2 text-center mb-6">
                Final Score: {score}/10
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Enter your username:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center flex-col">
                  {!isSubmitted ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Add to Leaderboard
                    </button>
                  ) : (
                    <p className="text-green-500 mt-4 text-lg font-semibold">
                      Your score has been added to the leaderboard
                    </p>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    onClick={resetGame}
                  >
                    Play Again
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default Hero;
