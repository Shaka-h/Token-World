<template> 
    <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
  
      <div class="p-3 css-selector  flex-col font-bold hidden sm:flex" style="width: 280px; ">
        <div class="flex flex-col justify-between pt-0 px-4 items-center">
            
            <div class="capitalize name border-b pt-2 pb-3 text-center mb-2 font-bold flex items-center" style="color: #0D1042; " >
                 
                <div>Auction Galaxy</div>
              </div>

            <div class="flex space-x-4"> 
                <div
                class="text-white hover:border-b cursor-pointer"
                @click="handleComponentClick('home')"
              >
                Home
              </div>
              <div
                class="text-white hover:border-b cursor-pointer"
                @click="handleComponentClick('connect')"
              >
                Connect
              </div>
            </div>
          </div>
    
        
        <div class="flex space-x-4 mt-4 items-center" v-if="myProfile?.length"> 
    <!--      <button type="button" class="border hover:font-bold btn border-white px-2 mr-3 text-white rounded-md" @click="toggleLanguage">{{ buttonText }}</button>-->
          <div v-if="!myProfile[0]?.profileContract" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
            <!-- <img src="@/assets/images/profile.png"  alt="Profile picture"> -->
          </div>
  
          <div v-if="myProfile[0]?.profileContract" class="rounded-md shadow intro-x ">
            <!-- <img :src="`http://127.0.0.1:8080/ipfs/${myProfile[0]?.photoCID}`" class="w-10 h-10 rounded-full" alt="Profile picture"/> -->
          </div>
  
          <span class="mr-2">{{myProfile[0].name}}</span>
        </div>
    
        <div class="overflow-y-scroll mt-8 h-full space-y-4">
          <template v-for="(navigationLink, index) of navigationLinks" :key="index">
            <template v-if="!navigationLink?.children?.length">
              <div class="flex items-center rounded-md " v-if="isActive(navigationLink?.link)" style="background-color: #c6deff">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
                <div class="flex items-center p-2 text-primary2 font-bold">
                  <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4"></svg-icon>
                  <span class="px-2">{{ navigationLink?.name }}</span>
                </div>
              </div>
              <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                   @click="goTo(navigationLink?.link)"
                   @mouseenter="hoveredLink = index"
                   @mouseleave="hoveredLink = null">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="hoveredLink === index"></span>
                <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
                <div class="flex items-center p-2">
                  <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4" v-if="hoveredLink === index"></svg-icon>
                  <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0D1042" v-else></svg-icon>
                  <span class="px-2">{{ navigationLink?.name }}</span>
                </div>
              </div>
            </template>
    
            <template v-else>
              <div class="px-3 intro-x mt-3 italic text-sm font-bold" style="color: #707070;">{{ navigationLink?.name }}</div>
              <div class="border-b mx-3"></div>
              <template v-for="(childNavigationLink, childIndex) of navigationLink?.children" :key="childIndex">
                <div class="flex items-center rounded-md" v-if="isActive(childNavigationLink?.link)" style="background-color: #c6deff">
                  <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
                  <div class="flex items-center p-2 text-primary2">
                    <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4"></svg-icon>
                    <span class="px-2">{{ childNavigationLink?.name }}</span>
                  </div>
                </div>
                <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                     @click="goTo(childNavigationLink?.link)"
                     @mouseenter="childHoveredLink = `${index}_${childIndex}`"
                     @mouseleave="childHoveredLink = null">
                  <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="childHoveredLink === `${index}_${childIndex}`"></span>
                  <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
                  <div class="flex items-center p-2">
                    <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4" v-if="childHoveredLink === `${index}_${childIndex}`"></svg-icon>
                    <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#999999" v-else></svg-icon>
                    <span class="px-2">{{ childNavigationLink?.name }}</span>
                  </div>           
                </div>
              </template>
            </template>
          </template>
  
          <div v-if="myProfile?.length" class="p-2 mt-8 mx-8 cursor-pointer">
            <div @click="postSomething" class="bg-primary rounded-lg p-1 items-center flex justify-center cursor-pointer">POST</div>
          </div>
  
        </div>
  
  
       
    
      </div>
    </template>
    
    <script setup>
    import SvgIcon from "@/components/shared/SvgIcon.vue";
    import {useRoute, useRouter} from "vue-router";
    import {onMounted, ref, computed} from "vue";
    import {walletAddressConnected} from "@/scripts/ContractConstants";
    import { useNFTstore } from "@/store/index.js";
    import {storeToRefs} from "pinia";
  
    const alphaConnectStore = useNFTstore();
    const route = useRoute()
    const router  = useRouter()
    const hoveredLink = ref(null)
    const childHoveredLink = ref(null)
    const { getStoreItem } = storeToRefs(alphaConnectStore)
  
    const isActive = (link) => {
      return route.fullPath.includes(link)
    }
  
    const myProfile = computed(() => {
      return getStoreItem.value("myProfile")
    })
  
  const navigationLinks = ref([
    {
      name: "Market",
      link: "/market",
      icon: "testimonials",
      permissions: [""],
    },
    {
      name: "Auction",
      link: "/auction",
      icon: "testimonials",
      permissions: [""],
    },
    {
      name: "Collections",
      link: "/collections",
      icon: "testimonials",
      permissions: [""],
    },
    {
      name: "Profile",
      link: "/profile",
      icon: "testimonials",
      permissions: [""],
    },
    {
      name: "Create",
      link: "/create",
      icon: "testimonials",
      permissions: [""],
    },
    
  ]);
  
  const makeAPost = ref(false);
  
  const closeDialog = () => {
    emits("closeDialog");
  };
  
  const postSomething = () => {
    makeAPost.value = true;
  };
  
  const activeComponent = ref('home');
  const components = ref([
    { name: "Home", id: "home" },
    { name: "Connect Wallet", id: "wallet" }
  ]);
  
  const handleComponentClick = (id) => {
    activeComponent.value = id;
    console.log(id);
    
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

  onMounted(async () => {
      await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress());
  });
  </script>
  
  <style scoped lang="scss">
  .inactive {
    color: #0d1042;
  }
  .inactive:hover {
    color: #257ae4;
  }
  
  .name {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 25px;
  }
  
  .sideBack {
    background: rgb(187, 132, 147);
    background: radial-gradient(
      circle,
      rgba(187, 132, 147, 1) 43%,
      rgba(219, 175, 160, 1) 69%,
      rgba(146, 144, 195, 1) 78%
    );
  }
  
  .css-selector {
    background: linear-gradient(270deg, #bb8493, #535c91, #9290c3);
    background-size: 600% 600%;
  
    -webkit-animation: AnimationName 39s ease infinite;
    -moz-animation: AnimationName 39s ease infinite;
    animation: AnimationName 39s ease infinite;
  }
  
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  </style>
  