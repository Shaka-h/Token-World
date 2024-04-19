<template>
    <div class="flex flex-row justify-between pt-0 px-4 items-center bg-primary">
      <div class="h-16 flex items-center w-16 cursor-pointer" @click="router.push('/')"> 
        <img src="../../public/saturn.png"/>
      </div>
      <div class="flex space-x-4"> 
        <div v-for="(component, index) of components" :key="index">
          <div
            v-if="component.id === activeComponent"
            class="text-white hover:border-b cursor-pointer"
            @click="handleComponentClick(component.id)"
          >
            {{ component.name }}
          </div>
          <div
            v-else
            class="text-white hover:border-b cursor-pointer"
            @click="handleComponentClick(component.id)"
          >
            {{ component.name }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import {connectWallet} from "@/scripts/WalletConnection.js";

  
  const router = useRouter();
  const activeComponent = ref('home');
  const components = ref([
    { name: "Home", id: "home" },
    { name: "Connect Wallet", id: "wallet" }
  ]);
  
  const handleComponentClick = (id) => {
    activeComponent.value = id;
    if (id === 'home') {
      router.push('/'); 
    }
    else {
      connectWallet()
    }
  };

  </script>
  