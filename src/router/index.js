import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductHome from '../views/Products/ProductHome.vue'
import ProductView from '../views/Products/Aution/ProductView.vue'
import CollectionLanding from '../views/Products/Collection/CollectionLanding.vue'
import CreateLanding from '@/views/Create/CreateLanding.vue'
import ViewCart from '@/views/Cart/ViewCart.vue'
import Taxations from '@/views/Taxes/Taxations.vue'
import MarketView from '@/views/Products/Market/MarketView.vue'


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
      path: '/market/:collection/:tokenId',
      name: 'marketDetails',
      component: MarketView
    },
    {
      path: '/auction/:collection/:tokenId',
      name: 'auctionDetails',
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
      path: '/cart/:myAddress',
      name: 'cart',
      component: ViewCart
    },
    {
      path: '/tax',
      name: 'tax',
      component: Taxations
    },    
  ]
})

export default router
