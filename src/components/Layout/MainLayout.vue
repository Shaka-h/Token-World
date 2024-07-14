<template>
    <div>
      <NavBar />
      <Nav2 />
      <div class="py-3 px-4 w-full rounded-r-xl shadow-lg overflow-y-scroll" style="background-color: #FAFCFE; height: 100vh;">
        <router-view></router-view>
      </div>
    </div>
  </template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
</script>