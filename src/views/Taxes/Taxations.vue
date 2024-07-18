<template>
    <div class="p-2"> 
      <div class="flex w-full p-2 justify-between mt-2">
        <div class="flex space-x-8 w-full"> 
            <div class="font-bold text-2xl">TOTAL TAX COLLECTED:</div>
            <div class="font-bold text-2xl">1,000,000,000,000<span class="ml-2">Atsh</span></div>
        </div>
        
        <div class="flex space-x-2">
            <div @click="goBack" class="cursor-pointer py-1 px-2 bg-primary rounded-lg">Back </div>
                      
        </div>
      </div>
  
      <div class="flex w-full p-2 justify-between mt-8">
        

          <div class="flex space-x-8 w-full"> 
              <div class="font-bold">All</div>
              <div class="flex">
                <div class="font-bold">Filter by date:</div> 
                <span class="ml-2">From</span>
                <span><input class="border ml-2"/></span>
                <span class="ml-2">To</span>
                <span><input class="border ml-2"/></span>
              </div>
          </div>
          
          <div class="flex">
              <search-bar />
          </div>
      </div>
      <div  class="mt-3 w-full">
        <div class="flex justify-between"> 
          <div class="font-bold">TRANSACTIONS</div>
          <div @click="goBack" v-if="viewAllProducts" class="px-2 rounded-lg bg-primary cursor-pointer">Back</div>
        </div>
        <simple-table :columns="columns" :table-data="tableData" :has-search="false">
          
        </simple-table>
      </div>
    </div>

    
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const viewAllCollections = ref(false)
const viewAllProducts = ref(false)

const columns = ref({
  "itemName": 'item Name',
  "collection": 'Collection',
  "from": 'From',
  "to": "To",
  "actualPrice": 'Actual Price',
  "tax": 'Tax',
  "date": "Date"
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
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
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
