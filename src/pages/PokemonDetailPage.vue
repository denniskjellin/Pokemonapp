<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPokemon } from '../api/pokemon'

// access route parameters
const route = useRoute()

// state variables
const pokemon = ref(null)
const loading = ref(true)
const error = ref(null)

// fetch Pokemon data on component mount
onMounted(async () => {
  try {
    const id = route.params.id
    const pokemonData = await getPokemon(id)

    // map pokemon details to desired format/information
    pokemon.value = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      types: pokemonData.types.map((item) => item.type.name),
      image: pokemonData.sprites.front_default,
    }
  } catch {
    error.value = 'Could not load Pokemon'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.image" :alt="pokemon.name" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Types: {{ pokemon.types.join(', ') }}</p>
    </div>
  </div>
</template>
