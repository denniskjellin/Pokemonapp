<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPokemonList, getPokemon } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

// state variables
const pokemons = ref([])
const loading = ref(true)
const error = ref(null)

// filter default, all pokemons
const selectedPokemonType = ref('all')

// computed for filtered pokemons
const filteredPokemons = computed(() => {
  // if 'all' is selected, return all
  if (selectedPokemonType.value === 'all') {
    return pokemons.value
  }

  return pokemons.value.filter((pokemon) => pokemon.types.includes(selectedPokemonType.value))
})

// fetch Pokemon data on component mount
onMounted(async () => {
  try {
    // fetch list of Pokemon - getPokemonList & getPokemon (api functions) from /api/pokemon.js
    const data = await getPokemonList()
    const details = await Promise.all(data.results.map((pokemon) => getPokemon(pokemon.name)))

    // map pokemon details to desired format/information
    pokemons.value = details.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      types: pokemon.types.map((item) => item.type.name),
      image: pokemon.sprites.front_default,
    }))
  } catch {
    error.value = 'Could not load Pokemon'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h1>Pokemon Home</h1>

  <div class="filters">
    <label>
      Filter by type:
      <select v-model="selectedPokemonType">
        <option value="all">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
      </select>
    </label>
  </div>

  <section>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else>
      <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </ul>
  </section>
  <!-- if no pokemon match selected filter -->
  <p v-if="filteredPokemons.length === 0">No Pokemon match the selected filter.</p>
</template>
