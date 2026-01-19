/* API reusable functions for fetching Pokemon data */

// Base url for the PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2'

// Fetch a list of Pokemon
export async function getPokemonList() {
  const res = await fetch(`${BASE_URL}/pokemon`)
  if (!res.ok) throw new Error('Failed to fetch pokemon list')
  return res.json()
}

// Fetch details of a specific Pokemon by name
export async function getPokemon(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`)
  if (!res.ok) throw new Error('Failed to fetch pokemon')
  return res.json()
}
