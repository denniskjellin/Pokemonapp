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
    <!-- Aria added for accessibility when pressing add to favorites -->
    <button
      @click.stop="togglePokemonFavorite(pokemon.id)"
      :aria-pressed="isFavoritePokemon(pokemon.id)"
      :aria-label="
        isFavoritePokemon(pokemon.id)
          ? `Remove ${pokemon.name} from favorites`
          : `Add ${pokemon.name} to favorites`
      "
    >
      {{ isFavoritePokemon(pokemon.id) ? '★' : '☆' }}
    </button>

    <img :src="pokemon.image" :alt="pokemon.name" width="96" height="96" />

    <strong>{{ pokemon.name }}</strong>
    – height: {{ pokemon.height }} – types: {{ pokemon.types.join(', ') }}
  </li>
</template>
