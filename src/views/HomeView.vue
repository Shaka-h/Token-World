<template>
  <main class="bg-primary">
    <NavBar />
    <div class="items-center w-full h-full mt-20 flex flex-col">
      <div class="heading flex items-center text-center">AUCTION GALAXY</div>
      <div class="heading2"> 
        Explore our token world with your Atsh
      </div>
      <div class="w-full"> 
        <div class="cards justify-evenly p-10">
             <div @click="router.push('/Products')" class="card primary">
              <strong class="mb-10 text-2xl">EXPLORE</strong>
              <div>Create your collection where you can mint your items and exchange as NFT tokens</div>
              <div>With NFTs begin your asset investments by investing in real estates, stocks, bonds ,etc represented as NFTs</div>
              <div>Benefit different services offered by service providers represented as NFTs such as special membership</div>
            </div>
        </div>
      </div>
    </div>
    
  </main>
  
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { wallet_address } from '@/scripts/WalletConnection';
import { walletConnected, walletAddressConnected } from "@/scripts/ContractConstants";


const router = useRouter();

onMounted(() => {
    if (typeof window.ethereum !== 'undefined' ) {
        walletConnected.value = true
        console.log("wallet is connected?", wallet_address.value)
    }

    //else if we don't have an ethereum provider installed what do we do ..... we alert the user to install a wallet for now tho but it's gon get more robust youfeemee..
    else {
        walletConnected.value = false
    }
});

</script>

<style scoped>
.heading{
  font-size: 100px;
  font-family: 'Platypi';
  color: #84A7A1;
}
.heading2{
  font-size: 50px;
  font-weight: 100px;
  font-family: 'Platypi';
  font-style: italic;
  color: #84A7A1;
}

.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.cards .primary {
  background-color: #84A7A1;
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
  width: 45%;
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
