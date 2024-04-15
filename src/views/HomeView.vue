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
        <div class="cards justify-evenly p-10">
             <div @click="router.push('/Products')" class="card red">
              <strong>Product</strong>
              <div>With Atsh Stable coin benefit commodity exchanges </div>
            </div>
            <div class="card blue">
              <strong>Asset Investment</strong>
              <div>With Atsh Stable coin begin your asset investments by investing in real estates, stocks, bonds ,etc using our stable coin </div>

            </div>
            <div class="card green">
              <strong>Services</strong>
              <div>With Atsh Stable coin benefit different services offered by differnt collections such as special membership</div>

            </div>
 
          <!-- <div @click="router.push('/Products')" class="card">
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
          </div> -->
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

.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.cards .red {
  background-color: #f43f5e;
}

.cards .blue {
  background-color: #3b82f6;
}

.cards .green {
  background-color: #22c55e;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 250px;
  width: 350px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: .7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}
</style>
