<template>
    <NavBar />
    
    <div class="flex w-full p-2 justify-between mt-2">
        <div class="flex space-x-8 w-full"> 
            
            <div>0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF</div>
        </div>
        
        <div class="flex space-x-2">
            <div>Create </div>
            <div>icon</div>
        </div>
    </div>
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
    <div class="mt-3 w-full">
      <div class="bg-white">ITEMS<span class="text-blue cursor-pointer ml-4">view all</span></div>
        <simple-table :columns="columns" :table-data="tableData" :has-search="false">
          <template v-slot:actions="{itemData}">
            <div class="">
              <div class="flex items-center">
                 <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer" @click="viewProduct(itemData)">
                  <svg-icon name="view" height="h-5" width="w-5" class="mr-1" color="#257ae4"></svg-icon>
                    view 
                </span>
              </div>
            </div>
          </template>
        </simple-table>
    </div>

</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
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