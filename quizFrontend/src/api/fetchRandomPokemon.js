// api/fetchRandomPokemon.js

import axios from 'axios';

// Function to fetch data for three random Pokémon from the Pokémon API
const fetchRandomPokemonData = async (numberOfPokemon = 3) => {
  try {
    const pokemonData = [];
    const pokemonIds = generateRandomPokemonIds(numberOfPokemon); // Generate random Pokémon IDs

    for (const id of pokemonIds) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); // Fetch Pokémon data using API
      const { name, sprites } = response.data;
      const pokemon = {
        id,
        name,
        image: sprites.front_default, // Extract the name and image URL from the API response
      };
      pokemonData.push(pokemon); // Add the Pokémon data to the array
    }

    return pokemonData; // Return the array containing data for three random Pokémon
  } catch (error) {
    throw new Error('Error fetching Pokémon data'); // Throw an error if fetching data fails
  }
};

// Helper function to generate random Pokémon IDs (1 to 898, as of Sep 2021)
const generateRandomPokemonIds = (numberOfPokemon) => {
  const maxPokemonId = 151; // The maximum Pokémon ID available in the API
  const randomIds = new Set();

  while (randomIds.size < numberOfPokemon) {
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1; // Generate a random ID between 1 and maxPokemonId
    randomIds.add(randomId); // Add the ID to the Set to ensure uniqueness
  }

  return Array.from(randomIds); // Convert the Set to an array and return the array of random Pokémon IDs
};

export { fetchRandomPokemonData };
