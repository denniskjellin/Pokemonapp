<script setup>
import { computed } from 'vue'
import { usePokemonFavorites } from '../composables/usePokemonFavorites'
import '../assets/pokemon-list.css'

// functionality for managing favorites (composables/usePokemonFavorites.js)
const { togglePokemonFavorite, isFavoritePokemon } = usePokemonFavorites()

// define props for the component
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const primaryPokemonType = computed(() => {
  return props.pokemon.types[0]
})
</script>

<template>
  <li class="pokemon-card">
    <div class="pokemon-card-row">
      <RouterLink class="pokemon-card-link" :to="`/pokemon/${pokemon.id}`">
        <div class="card-header">
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
        </div>

        <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />

        <div class="pokemon-info">
          <span class="type-badge" :class="`type-${primaryPokemonType}`">
            {{ primaryPokemonType }}
          </span>

          <span class="height">Height: {{ pokemon.height }}</span>
          <span class="type">Types: {{ pokemon.types.join(', ') }}</span>
        </div>
      </RouterLink>

      <button
        type="button"
        class="favorite-button"
        @click="togglePokemonFavorite(pokemon.id)"
        :aria-label="
          isFavoritePokemon(pokemon.id)
            ? `Remove ${pokemon.name} from favorites`
            : `Add ${pokemon.name} to favorites`
        "
      >
        {{ isFavoritePokemon(pokemon.id) ? '★' : '☆' }}
      </button>
    </div>
  </li>
</template>

<style scoped>
.pokemon-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
}

.pokemon-card-row {
  position: relative;
}

.favorite-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.pokemon-card-link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: inherit;
  text-decoration: none;
}

.pokemon-card-link:hover {
  background-color: #f1f1f1;
}

.pokemon-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pokemon-name {
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0;
}

.favorite-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.pokemon-image {
  width: 96px;
  height: 96px;
  align-self: center;
}
.type-badge {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #fff;
}

.type-fire {
  background-color: #9c2c13;
}

.type-water {
  background-color: #0d4b9b;
}

.type-grass {
  background-color: #1f6f43;
}

.type-electric {
  background-color: #8c6d1f;
}

.type-bug {
  background-color: #556b2f;
}

.type-normal {
  background-color: #3f4a56;
}
</style>
