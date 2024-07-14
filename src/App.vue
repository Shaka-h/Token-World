<script setup>
import {useNFTstore} from "@/store/index.js";
const store = useNFTstore()

</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <div v-if="store.isLoading" class="relative"> 
    <div class="absolute bottom-10 right-6 text-white">
      <div class="loading-bar ">Loading</div>
    </div>
  </div>
</template>


<style scoped>
.loading-bar {
  position: relative;
  width: 110px;
  height: 110px;
  background: #FCFCFD;
  border: px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 111px;
  font-family: sans-serif;
  font-size: 15px;
  color: #0D1042;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: 0 0 20px #0D1042;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.loading-bar:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 5px solid #0D1042;
  border-right: 5px solid #0D1042;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}

@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(405deg);
  }
}

</style>

