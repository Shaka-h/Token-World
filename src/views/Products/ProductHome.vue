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
        <div>ITEMS</div>
        <simple-table :columns="columns" :table-data="tableData" :has-search="false">
          <template v-slot:actions="{}">
            <div class="">
              <div class="flex items-center">
                 <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer">
                  <svg-icon name="view" height="h-5" width="w-5" class="mr-1" color="#257ae4"></svg-icon>
                    view 
                </span>
              </div>
            </div>
          </template>
        </simple-table>
    </div>

    <div class="mt-3 w-full">
        <div class="bg-white">COLLECTIONS</div>
        <div v-for="(items, index) of collections" :key="index" class="flex flex-row"> 
            <div class="bg-slate-800 border border-slate-700 rounded-xl p-2 text-sm col-md-3">
                <h1 class="text-center text-slate-600 text-xl font-bold">Send Feedback</h1>
                <div class="bg-slate-700 text-slate-300 h-28 border border-slate-600  resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300">
                    loresum
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { ref } from 'vue';

const columns = ref({
  "alumniName": 'alumniName',
  "year": 'year',
})

const tableData = ref([
  {
    "alumniName": 'Brian Makene',
    "clubName": 'Cyber club',
    "year": "2019"
  },
  {
    "alumniName": 'Judith Egid',
    "clubName": 'Blockchain club',
    "year": "2013"
  },
  {
    "alumniName": 'Jackson Emmanuel',
    "clubName": 'Ai club',
    "year": "2020"
  },
  {
    "alumniName": 'Deogratias Widambe',
    clubName: 'Developer club',
    year: "2022"
  }
]);

const collections = ref ([
    {
        "name": 'Bakhresa',
        "items": 'milk, chocolate,etc',
        "rarity": "Legendary"
    },
  {
    "name": "Classic Console",
    "description": "Relive the golden age of gaming with this iconic console that pioneered the home entertainment revolution.",
    "rarity": "Legendary"
  },
  {
    "name": "Smartphone Sensation",
    "description": "Experience the evolution of communication with this groundbreaking smartphone that changed the way we connect and interact.",
    "rarity": "Epic"
  },
  {
    "name": "Revolutionary Robot",
    "description": "Meet the futuristic robot that revolutionized automation and robotics, ushering in a new era of technological innovation.",
    "rarity": "Mythic"
  },
  {
    "name": "Digital Camera Masterpiece",
    "description": "Capture life's precious moments with unparalleled clarity and precision using this legendary digital camera that redefined photography.",
    "rarity": "Legendary"
  },
  {
    "name": "Smartwatch Wonder",
    "description": "Stay connected and organized on the go with this innovative smartwatch that seamlessly integrates technology into your daily life.",
    "rarity": "Rare"
  },
  {
    "name": "Virtual Reality Voyager",
    "description": "Immerse yourself in virtual worlds with this cutting-edge VR headset that transports you to realms limited only by your imagination.",
    "rarity": "Epic"
  }
])

</script>