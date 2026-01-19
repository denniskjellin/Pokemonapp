<script setup>
import { ref, onMounted } from 'vue'
import { getPokemonList, getPokemon } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

// state variables
const pokemons = ref([])
const loading = ref(true)
const error = ref(null)

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
  <div>
    <h1>Pokemon Home</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else>
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </ul>
  </div>
</template>
