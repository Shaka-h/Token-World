<template>
    <NavBar />
    
    <Nav2 />
    <div class="flex w-full p-2 justify-between mt-2">
        <div class="flex space-x-8 w-full"> 
            <div>All</div>
            <div>Trending</div>
            <div>Select categories</div>
        </div>
        
        <div class="flex">
            <search-bar />
        </div>
    </div>

    <div class="mt-3"> 
      <div class="bg-white">COLLECTIONS<span class="text-blue cursor-pointer ml-4">view all</span></div>
      <div class="flex">
        <div v-for="(item, index) of collections" :key="index" class="justify-evenly p-10 col-md-3 cursor-pointer" style="">   
          <div @click="viewCollection(item)" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{item.name}}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{item.description}}</p>
          </div>
            
        </div>
      </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import Nav2 from '@/components/Nav2.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const columns = ref({
  "itemName": 'item Name',
  "owner": 'owner',
  "price": 'price',
})
const router = useRouter();
const viewProduct = (item) => {
  console.log(item.tokenId)
  router.push(`/item/${item.tokenId}`)
}
const viewCollection = (item) => {
  console.log(item)
  router.push(`/collection/${item.tokenId}`)
}
const tableData = ref([
  {
    "itemName": 'Iphone 14',
    "owner": 'Brian Makene',
    "price": "25000 Atsh",
    "tokenId": 1,
  },
  {
    "itemName": 'Iphone 14',
    "owner": 'Brian Makene',
    "price": "25000 Atsh",
    "tokenId": 1,
  },
  {
    "itemName": 'Iphone 14',
    "owner": 'Brian Makene',
    "price": "25000 Atsh",
    "tokenId": 1,
  },
  {
    "itemName": 'Iphone 14',
    "owner": 'Brian Makene',
    "price": "25000 Atsh",
    "tokenId": 1,
  },
  {
    "itemName": 'Iphone 14',
    "owner": 'Brian Makene',
    "price": "25000 Atsh",
    "tokenId": 1,
  },
]);

const collections = ref ([
  {
    "name": "Classic Console",
    "description": "Relive the golden age of gaming with this iconic console that pioneered the home entertainment revolution.",
    "rarity": "Legendary",
    "tokenId": 1,
  },
  {
    "name": "Smartphone Sensation",
    "description": "Experience the evolution of communication with this groundbreaking smartphone that changed the way we connect and interact.",
    "rarity": "Epic",
    "tokenId": 1,
  },
  {
    "name": "Revolutionary Robot",
    "description": "Meet the futuristic robot that revolutionized automation and robotics, ushering in a new era of technological innovation.",
    "rarity": "Mythic",
    "tokenId": 1,
  },
  {
    "name": "Digital Camera Masterpiece",
    "description": "Capture life's precious moments with unparalleled clarity and precision using this legendary digital camera that redefined photography.",
    "rarity": "Legendary",
    "tokenId": 1,
  },
  {
    "name": "Smartwatch Wonder",
    "description": "Stay connected and organized on the go with this innovative smartwatch that seamlessly integrates technology into your daily life.",
    "rarity": "Rare",
    "tokenId": 1,
  },
  {
    "name": "Virtual Reality Voyager",
    "description": "Immerse yourself in virtual worlds with this cutting-edge VR headset that transports you to realms limited only by your imagination.",
    "rarity": "Epic",
    "tokenId": 1,
  }
])

</script>