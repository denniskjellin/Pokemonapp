<script setup>
import { ref, watchEffect, computed } from 'vue'
import { usePokemonFavorites } from '../composables/usePokemonFavorites'
import { getPokemon } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

const { pokemonFavorites } = usePokemonFavorites()

// state variables
const favoritesData = ref([])
const loading = ref(false)
const error = ref(null)

const selectedPokemonType = ref('all')
const sortPokemonBy = ref('name')

// computed property for filtered and sorted favorites
const filteredAndSortedFavorites = computed(() => {
  // new array to avoid mixing with original fetch data
  let list = [...favoritesData.value]

  // filter by selected type, if not 'all' as default
  if (selectedPokemonType.value !== 'all') {
    list = list.filter((pokemon) => pokemon.types.includes(selectedPokemonType.value))
  }

  // sort by selected value
  if (sortPokemonBy.value === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortPokemonBy.value === 'height') {
    list.sort((a, b) => a.height - b.height)
  }

  return list
})

// fetch favorite details when favorite list changes
watchEffect(async () => {
  if (pokemonFavorites.value.length === 0) {
    favoritesData.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    // fetch details for each favorite pokemon
    const details = await Promise.all(pokemonFavorites.value.map((id) => getPokemon(id)))

    // map pokemon details to desired format/information
    favoritesData.value = details.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      types: pokemon.types.map((item) => item.type.name),
      image: pokemon.sprites.front_default,
    }))
  } catch {
    error.value = 'Error loading favorite Pokemon.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h1>Favorites</h1>

  <form class="filter">
    <label for="type-filter">Filter by type:</label>
    <select id="type-filter" v-model="selectedPokemonType">
      <option value="all">All</option>
      <option value="bug">Bug</option>
      <option value="electric">Electric</option>
      <option value="fire">Fire</option>
      <option value="grass">Grass</option>
      <option value="normal">Normal</option>
      <option value="water">Water</option>
    </select>

    <label for="sort-filter">Sort by:</label>
    <select id="sort-filter" v-model="sortPokemonBy">
      <option value="name">Name (A–Z)</option>
      <option value="height">Height</option>
    </select>
  </form>

  <div>
    <p v-if="loading" role="status" aria-live="polite">Loading...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="filteredAndSortedFavorites.length === 0">You have no favorite Pokemon.</p>

    <ul v-else class="pokemon-list">
      <PokemonCard
        v-for="pokemon in filteredAndSortedFavorites"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </ul>
  </div>
</template>
