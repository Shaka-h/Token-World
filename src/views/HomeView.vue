<script setup>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <main class="bg-primary">
    <NavBar />
    <div class="items-center w-full h-full flex flex-col">
      <div class="heading flex items-center text-center">TOKEN WORLD</div>
      <div class="heading2"> 
        Explore our token world with your Atsh
      </div>
      <div class="w-full"> 
        <div class="flex justify-evenly p-10">
          <div @click="router.push('/Products')" class="card">
            <div class="content">
              <div class="back">
                <div class="back-content">
                  <strong>Product</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="content">
              <div class="back">
                <div class="back-content">
                  <strong>Asset Investment</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="content">
              <div class="back">
                <div class="back-content">
                  <strong>Services</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.heading{
  font-size: 100px;
  font-family: 'Courier New', Courier, monospace;
  font-style: italic;
}
.heading2{
  font-size: 50px;
  font-family: 'Courier New', Courier, monospace;
  font-style: italic;
}

.card {
  overflow: visible;
  width: 190px;
  height: 254px;
  cursor: pointer;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0px 0px 10px 1px #000000ee;
  border-radius: 5px;
}

.back {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
  animation: rotation_481 5000ms infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.card:hover .content {
  width: 200px;
  height: 264px;
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}
 
@keyframes floating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
