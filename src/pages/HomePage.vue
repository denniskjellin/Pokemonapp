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
  if (selectedPokemonType.value === 'all') {
    return pokemons.value
  }
  return pokemons.value.filter((pokemon) => pokemon.types.includes(selectedPokemonType.value))
})

// fetch Pokemon data on component mount
onMounted(async () => {
  try {
    const data = await getPokemonList()
    const details = await Promise.all(data.results.map((pokemon) => getPokemon(pokemon.name)))

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
  </form>

  <section>
    <p v-if="loading" role="status" aria-live="polite">Loading...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="filteredPokemons.length === 0">No Pokemon match the selected filter.</p>
    <ul v-else class="pokemon-list">
      <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </ul>
  </section>
</template>
