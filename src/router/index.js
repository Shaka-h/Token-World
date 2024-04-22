import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductHome from '../views/Products/ProductHome.vue'
import ProductView from '../views/Products/ProductView.vue'
import CollectionLanding from '../views/Products/Collection/CollectionLanding.vue'
import CreateLanding from '@/views/Create/CreateLanding.vue'
import ViewCart from '@/views/Cart/ViewCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Products',
      name: 'product',
      component: ProductHome
    },
    {
      path: '/item/:collection/:tokenId',
      name: 'productDetails',
      component: ProductView
    },
    {
      path: '/collection/:collectionId',
      name: 'productCollection',
      component: CollectionLanding
    },
    {
      path: '/item/:tokenId',
      name: 'collectionitem',
      component: ProductView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateLanding
    },
    {
      path: '/cart/:nftAddress',
      name: 'cart',
      component: ViewCart
    },
    
  ]
})

export default router
