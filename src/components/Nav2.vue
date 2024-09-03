<template> 
    <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
  
      <div class="px-3 flex-col font-bold hidden sm:flex" style="background-color: #F6DCAC;">

        <div class="flex items-center justify-between border-b ">
                
        <div class="flex py-10 h-24">
          <div class="flex items-center cursor-pointer w-32" @click="router.push('/')"> 
            <img src="../../public/logo2-remov.png" style="width: 100%;"/>
          </div> 
          <div class="capitalize name  text-center font-bold flex items-center" style="color: #0D1042; " >                
            <div>Auction Galaxy</div>
          </div>
          
        </div>
            
          <div class="flex space-x-4 "> 
            <button class="button" @click="handleComponentClick('home')">
              <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">Home</span>
              </span>
            </button>

            <button class="button" @click="handleComponentClick('connect')">
              <span class="button_lg">
                  <span class="button_sl"></span>
                  <span class="button_text">Connect</span>
              </span>
            </button>
              <!-- <div
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
            </div> -->
          </div>    
        </div>
    
        <div class="flex justify-between items-center">

          <div class="flex py-4 ml-4">
            <template v-for="(navigationLink, index) of navigationLinks" :key="index">
              <template v-if="!navigationLink?.children?.length">
                <div class="flex items-center rounded-md " v-if="isActive(navigationLink?.link)" style="background-color: #FEAE6F ">
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
                  <div class="flex items-center rounded-md" v-if="isActive(childNavigationLink?.link)" style="background-color: #FEAE6F ">
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

   
          <div @click="goBack" class="back">
            <svg color="#fff" height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span class="text-white">Back</span>
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
                router.push("/market"); // Access the value of wallet using .value

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
    font-size: 30px;
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
  
 /* From Uiverse.io by Jedi-hongbin */ 
.back {
  display: flex;
  height: 3em;
  width: 90px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 10px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #028391;
 }
 
 .back > svg {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 20px;
  transition: all 0.4s ease-in;
 }
 
 .back:hover > svg {
  font-size: 1.2em;
  transform: translateX(-5px);
 }
 
 .back:hover {
  transform: translateY(-2px);
 }

 /* From Uiverse.io by mrhyddenn */ 
.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  color: #0f1923;
  cursor: pointer;
  position: relative;
  padding: 4px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  transition: all .120s ease;
}

.button::before,
.button::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid #7D8082;
  transition: all .120s ease;
}

.button::before {
  top: 0;
  border-bottom-width: 0;
}

.button::after {
  bottom: 0;
  border-top-width: 0;
}

.button:active,
.button:focus {
  outline: none;
}

.button:active::before,
.button:active::after {
  right: 3px;
  left: 3px;
}

.button:active::before {
  top: 3px;
}

.button:active::after {
  bottom: 3px;
}

.button_lg {
  position: relative;
  display: block;
  padding: 8px 20px;
  color: #fff;
  background-color: #0f1923;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #0f1923;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #0f1923;
  transition: all .2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  background-color: #FEAE6F;
  transform: skew(-15deg);
  transition: all .2s ease;
}

.button_text {
  position: relative;
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}

  </style>
  