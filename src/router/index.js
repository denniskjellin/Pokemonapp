import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PokemonDetailPage from '../pages/PokemonDetailPage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/pokemon/:id', name: 'pokemon-detail', component: PokemonDetailPage },
  { path: '/favorites', name: 'favorites', component: FavoritesPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
