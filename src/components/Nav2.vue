<template>
    <div class="flex w-full p-2 justify-between py-3 items-center px-4 bg-primary2">
        <div class="flex space-x-8 w-full"> 
            <div v-if="!walletAddressConnected" class="p-2 bg-primary4 border-primary">NO WALLET ACCOUNT DETECTED</div>
            <div v-if="walletAddressConnected" class="p-2 bg-primary4 border-primary">{{walletAddressConnected}}</div>
        </div>
        
        <div class="flex space-x-2">
            <div @click="router.push('/create')" class="btn cursor-pointer bg-primary4">
                <span class="icon">
                    <svg viewBox="0 0 175 80" width="30" height="30">
                        <rect width="80" height="15" fill="#161616" rx="10"></rect>
                        <rect y="30" width="80" height="15" fill="#161616" rx="10"></rect>
                        <rect y="60" width="80" height="15" fill="#161616" rx="10"></rect>
                    </svg>
                </span>
                <span class="text">Create</span>
            </div>
            <!-- <div v-if="walletAddressConnected" @click="router.push('/cart/1')" class="btn bg-primary4 cursor-pointer">
                <span class="icon">
                    <svg viewBox="0 0 175 80" width="30" height="30">
                        <rect width="80" height="15" fill="#161616" rx="10"></rect>
                        <rect y="30" width="80" height="15" fill="#161616" rx="10"></rect>
                        <rect y="60" width="80" height="15" fill="#161616" rx="10"></rect>
                    </svg>
                </span>
                <span class="text">Profile</span>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {walletAddressConnected} from "@/scripts/ContractConstants";
import { onMounted } from 'vue';

const router = useRouter()

onMounted(() => {
  if (typeof window.ethereum !== 'undefined') {
          const provider = window.ethereum;
          provider.request({ method: 'eth_requestAccounts' })
              .then((accounts) => {
                  walletAddressConnected.value = accounts[0];
                  console.log('Connected with account:', walletAddressConnected.value);

                  // Now you can use userAccount to interact with the blockchain
              })
              .catch((error) => {
                  console.error('Error connecting to wallet:', error);
              });

              // Listen for account changes
              provider.on('accountsChanged', (accounts) => {
                  console.log('Account changed to:', accounts[0]);
              });

              // Listen for network changes
              provider.on('chainChanged', (chainId) => {
                  console.log('Network changed to:', chainId);
              });
          // Check if MetaMask is connected to the network
          if (provider.networkVersion !== null || provider.chainId !== null) {
              // Request access to the user's accounts
             
          } else {
              console.error('MetaMask is not connected to the Ethereum network.');
          }
      } else {
          console.error('MetaMask not detected. Please install MetaMask to connect your wallet.');
      }
})

</script>

<style scoped>
.btn {
    width: 140px;
    height: 40px;
    border-radius: 5px;
    border: none;
    transition: all 0.5s ease-in-out;
    display: flex;
    align-items: center;
  }
  
  .btn:hover {
    box-shadow: 0 0 20px 0px #2e2e2e3a;
  }
  
  .btn .icon {
    position: absolute;
    height: 40px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }
  
  .btn .text {
    transform: translateX(55px);
  }
  
  .btn:hover .icon {
    width: 175px;
  }
  
  .btn:hover .text {
    transition: all 0.5s;
    opacity: 0;
  }
  
  .btn:focus {
    outline: none;
  }
  
  .btn:active .icon {
    transform: scale(0.85);
  }
</style>