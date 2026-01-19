<script setup>
import { useRouter } from 'vue-router'
import { usePokemonFavorites } from '../composables/usePokemonFavorites'

// functionality for managing favorites (composables/usePokemonFavorites.js)
const { togglePokemonFavorite, isFavoritePokemon } = usePokemonFavorites()

// define props for the component
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

// function to navigate to the Pokémon detail page
const goPokemonDetail = () => {
  router.push(`/pokemon/${props.pokemon.id}`)
}
</script>

<template>
  <li @click="goPokemonDetail">
    <button @click.stop="togglePokemonFavorite(pokemon.id)">
      <!-- unicode for star symbol -->
      {{ isFavoritePokemon(pokemon.id) ? '★' : '☆' }}
    </button>

    <img :src="pokemon.image" :alt="pokemon.name" />
    <strong>{{ pokemon.name }}</strong>
    – height: {{ pokemon.height }} – types: {{ pokemon.types.join(', ') }}
  </li>
</template>
