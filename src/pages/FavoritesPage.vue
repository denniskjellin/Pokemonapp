<script setup>
import { ref, watchEffect } from 'vue'
import { usePokemonFavorites } from '../composables/usePokemonFavorites'
import { getPokemon } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

const { pokemonFavorites } = usePokemonFavorites()

const favoritesData = ref([])
const loading = ref(false)
const error = ref(null)

// fetch favorite details when favorite list changes
watchEffect(async () => {
  if (pokemonFavorites.value.length === 0) {
    favoritesData.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    // fetch details for each favorite Pokemon
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
  <div>
    <h1>Favorites</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <p v-else-if="favoritesData.length === 0">You have no favorite Pokémon yet.</p>

    <ul v-else>
      <PokemonCard v-for="pokemon in favoritesData" :key="pokemon.id" :pokemon="pokemon" />
    </ul>
  </div>
</template>
