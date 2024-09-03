<template>
    <div class="flex flex-row justify-between pt-0 px-4 items-center" style="background-color: #0D1042">
      <!-- <div class="h-16 flex items-center w-16 cursor-pointer" @click="router.push('/')"> 
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
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import {walletAddressConnected} from "@/scripts/ContractConstants";

  
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
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const provider = window.ethereum;

    // Function to switch to the desired network
        // const switchToNetwork = async () => {
        //     try {
        //         await provider.request({
        //             method: 'wallet_switchEthereumChain',
        //             params: [{ chainId: '0xAA36A7' }] // 11155111 in hexadecimal
        //         });
        //         console.log('Successfully switched to chain 11155111');
        //     } catch (switchError) {
        //         if (switchError.code === 4902) {
        //             // This error code indicates that the chain has not been added to MetaMask
        //             try {
        //                 await provider.request({
        //                     method: 'wallet_addEthereumChain',
        //                     params: [{
        //                         chainId: '0xAA36A7',
        //                         chainName: 'Sepolia test network',
        //                         rpcUrls: ['https://sepolia.infura.io/v3/'],
        //                         nativeCurrency: {
        //                             name: 'SepoliaETH',
        //                             symbol: 'SepoliaETH',
        //                             decimals: 18
        //                         },
        //                         blockExplorerUrls: ['https://sepolia.etherscan.io']
        //                     }]
        //                 });
        //             } catch (addError) {
        //                 console.error('Failed to add network:', addError);
        //             }
        //         } else {
        //             console.error('Failed to switch network:', switchError);
        //         }
        //     }
        // };

        provider.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                walletAddressConnected.value = accounts[0];
                console.log('Connected with account:', walletAddressConnected.value);
                router.push("/Products"); // Access the value of wallet using .value

                // Attempt to switch to the desired network
                // switchToNetwork().then(() => {
                //     router.push(`/${walletAddressConnected.value}/posts`); // Access the value of wallet using .value
                // }).catch((error) => {
                //     console.error('Error switching network:', error);
                // });
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
            // MetaMask is connected
        } else {
            console.error('MetaMask is not connected to the Ethereum network.');
        }
    } else {
        console.error('MetaMask not detected. Please install MetaMask to connect your wallet.');
    }

    }
  };
  
</script>
  