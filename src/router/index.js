import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductHome from '../views/Products/ProductHome.vue'
import ProductView from '../views/Products/Aution/ProductView.vue'
import CollectionLanding from '../views/Products/Collection/CollectionLanding.vue'
import CollectionHome from '../views/Products/Collection/CollectionHome.vue'
import CreateLanding from '@/views/Create/CreateLanding.vue'
import Profile from '@/views/Profile/Profile.vue'
import Taxations from '@/views/Taxes/Taxations.vue'
import MarketView from '@/views/Products/Market/MarketView.vue'
import Connected from '@/views/Connected.vue'
import collectionItems from '@/views/Profile/collectionItems.vue'
import AuctionHome from '@/views/Products/Aution/AuctionHome.vue'
import MarketHome from '@/views/Products/Market/MarketHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/', // Dynamic segment for wallet address
      name: 'landing',
      component: Connected,
      children: [
        {
          path: '/Products',
          name: 'product',
          component: ProductHome
        },
        {
          path: '/auction',
          name: 'auction',
          component: AuctionHome
        },
        {
          path: '/market',
          name: 'market',
          component:MarketHome
        },
        {
          path: '/Collections',
          name: 'collections',
          component: CollectionHome
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
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/profile/:collectionId',
          name: 'collectionItems',
          component: collectionItems
        },
        {
          path: '/tax',
          name: 'tax',
          component: Taxations
        },
      ]
    }
       
  ]
})

export default router
