<script setup>
import { useRouter } from 'vue-router'

// define props for the component
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

// set up router for navigation
const router = useRouter()

// function to navigate to the Pokémon detail page
const goPokemonDetail = () => {
  router.push(`/pokemon/${props.pokemon.id}`)
}
</script>

<template>
  <li @click="goPokemonDetail">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <strong>{{ pokemon.name }}</strong>
    – height: {{ pokemon.height }} – types: {{ pokemon.types.join(', ') }}
  </li>
</template>
