<template>
  <main class="backgroundstyle" style="">
    <NavBar />
    <div class="w-full h-full ml-20 mt-20 flex flex-col">
      <div class="heading flex text-center">AUCTION GALAXY</div>
      <div class="heading2 w-1/2"> 
        Bid, collect, and invest in the future of digital art with confidence, knowing that each NFT is authenticated, secure, and backed by blockchain technology.
      </div>
      <div class="w-full ml-10"> 
        <div class="cards justify-evenly py-10">
             <div @click="router.push('/Products')" class="card primary">
              <div></div>
              Explore the world of digital treasures with this exclusive NFT auction platform. 
              <div>Start by creating your collection where you can mint your items and exchange as NFT tokens</div>
              <div>With NFTs begin your asset investments by investing in real estates, stocks, bonds ,etc represented as NFTs</div>
              <div>Benefit different services offered by service providers represented as NFTs such as special membership</div>
              Each piece is a limited edition masterpiece, waiting to be owned by a passionate collector like you
            </div>
            <!-- <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg> -->
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
.backgroundstyle{
  background-image: url('../../public/background1.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.heading{
  font-size: 100px;
  font-family: 'Platypi';
  color: #84A7A1;
}
.heading2{
  font-size: 30px;
  font-weight: 100px;
  font-family: 'Platypi';
  font-style: italic;
  color: #84A7A1;
  text-align: center;
}

.cards {
  flex-direction: row;
  gap: 15px;
}

.cards .primary {
  background-color: #84A7A1;
  background: linear-gradient(-45deg, #1F6E8C 0%,#84A7A1, #0D1042 100% );

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
  filter: blur(2px);
  transform: scale(0.9, 0.9);
}
</style>
