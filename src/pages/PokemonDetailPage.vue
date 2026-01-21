<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPokemon } from '../api/pokemon'

const route = useRoute()

const pokemon = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const id = route.params.id
    const pokemonData = await getPokemon(id)

    pokemon.value = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      baseExperience: pokemonData.base_experience,
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
    <p v-if="loading" role="status" aria-live="polite">Loading...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>

    <div v-else class="pokemon-detail">
      <h1 class="pokemon-name">{{ pokemon.name }}</h1>
      <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />

      <ul class="pokemon-info">
        <li>
          <span class="label">Height:</span>
          <span class="value">{{ pokemon.height }}</span>
        </li>
        <li>
          <span class="label">Weight:</span>
          <span class="value">{{ pokemon.weight }}</span>
        </li>
        <li>
          <span class="label">Experience:</span>
          <span class="value">{{ pokemon.baseExperience }}</span>
        </li>
        <li>
          <span class="label">Types:</span>
          <span class="value">{{ pokemon.types.join(', ') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pokemon-detail {
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.pokemon-name {
  text-transform: capitalize;
}

.pokemon-image {
  width: 160px;
  height: 160px;
}

.pokemon-info {
  padding: 0;
  text-transform: capitalize;
}

.pokemon-info li {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pokemon-info .label {
  font-weight: 600;
}
</style>
