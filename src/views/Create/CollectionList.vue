<template>
    <div class="flex flex-col">
      <div class="text-2xl mb-4 border-b-4">Choose Collection to mint item</div>
        <div @click="router.push('/cart/1')" v-for="(item, index) of collections" :key="index" class="border hover:bg-gray hover:p-3 p-2 my-2 cursor-pointer" style="">   
          <div @click="viewCollection(item)" class="">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{item.name}}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{item.description}}</p>
          </div>
            
        </div>
      </div>
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
