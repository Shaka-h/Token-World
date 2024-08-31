<template>
  <main class="backgroundstyle h-full bg-black" style="">
    <NavBar />
    <div class="w-full ml-20 mt-20 flex flex-col">
      <div class="heading flex text-center">AUCTION GALAXY</div>
      <div class="heading2 w-1/2"> 
        Bid, collect, and invest in the future of digital art with confidence, knowing that each NFT is authenticated, secure, and backed by blockchain technology.
      </div>
      <div class="w-full ml-10"> 
        <div class="cards justify-evenly py-10">
             <div class="card primary px-4">
              Explore the world of digital treasures with this exclusive NFT auction platform. 
              <div>Start by creating your collection where you can mint your items and exchange as NFT tokens</div>
              <div>With NFTs begin your asset investments by investing in real estates, stocks, bonds ,etc represented as NFTs</div>
              <div>Benefit different services offered by service providers represented as NFTs such as special membership</div>
              Each piece is a limited edition masterpiece, waiting to be owned by a passionate collector like you
              <span class="flex items-center w-full justify-center mt-4 mr-3 text-primary2 hover:font-bold cursor-pointer" @click="router.push('/market')">
                <svg-icon name="enter" height="h-6" width="w-6" class="mr-1" color="#257ae4"></svg-icon> 
              </span>
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
import SvgIcon from '@/components/shared/SvgIcon.vue';

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
  align-items: start;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 250px;
  width: 45%;
  border-radius: 10px;
  color: white;
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

</style>
