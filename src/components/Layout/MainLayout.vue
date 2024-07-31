<template>
  <!-- <div>
    <NavBar />
    <Nav2 />
    <div class="py-3 px-4 w-full rounded-r-xl shadow-lg overflow-y-scroll" style="background-color: #FAFCFE; height: 100vh;">
      <router-view></router-view>
    </div>
  </div> -->

  <div class="background flex flex-col" style="height: 100vh; font-weight: 400;">
    


    <div class="shadow flex overflow-hidden" style="font-family: 'Quicksand', sans-serif;background-color: #fff; height: 100vh;">
      <div class="sm:hidden">
        <button @click="toggleMobileMenu" class="text-black mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <Nav2 :navigation-links="navigationLinks" :panel-name="panelName"></Nav2>


      <div class="w-full rounded-lg m-4 shadow-lg overflow-y-scroll" style="background-color: #E8E8E8; height: 100%;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'

</script>

<style scoped>

</style>
