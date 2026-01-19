import { ref, watch } from 'vue'

// init pokemonFavorites from localStorage or as empty
const pokemonFavorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

// watch for changes and update -> localStorage
watch(
  pokemonFavorites,
  () => {
    localStorage.setItem('favorites', JSON.stringify(pokemonFavorites.value))
  },
  { deep: true },
)

// add or remove favorite status by id
const togglePokemonFavorite = (id) => {
  if (pokemonFavorites.value.includes(id)) {
    pokemonFavorites.value = pokemonFavorites.value.filter((favoriteId) => favoriteId !== id)
  } else {
    pokemonFavorites.value.push(id)
  }
}

// check if favorite pokemon
const isFavoritePokemon = (id) => {
  return pokemonFavorites.value.includes(id)
}

export function usePokemonFavorites() {
  return {
    pokemonFavorites,
    togglePokemonFavorite,
    isFavoritePokemon,
  }
}
