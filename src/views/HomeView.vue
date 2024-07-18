<script >
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/vue-fontawesome';

// const router = useRouter();
import router from '@/router';
import LottieVue from './lottie.vue'
import LottieVue3 from './lottie3.vue'
export default {
  data() {
    return {
      showScrollButton: false,
      scrolledDown: false,
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    scrollDown() {
        // Get the height of the viewport
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
        // Scroll down by the height of the viewport
        window.scrollTo({
          top: viewportHeight,
          behavior: 'smooth' // Add smooth scrolling behavior
        });
    },
    scrollToAbout() {
      const aboutsection = document.getElementById("about")
      const aboutsectiontop = aboutsection.offsetTop

      window.scrollTo({
        top: aboutsectiontop,
        behavior: "smooth"
      })
    },
    scrollToService() {
      const aboutsection = document.getElementById("service")
      const aboutsectiontop = aboutsection.offsetTop

      window.scrollTo({
        top: aboutsectiontop,
        behavior: "smooth"
      })
    },
    scrollToBenefits() {
      const aboutsection = document.getElementById("benefits")
      const aboutsectiontop = aboutsection.offsetTop

      window.scrollTo({
        top: aboutsectiontop,
        behavior: "smooth"
      })
    },
    scrollToContact() {
      const aboutsection = document.getElementById("contact")
      const aboutsectiontop = aboutsection.offsetTop

      window.scrollTo({
        top: aboutsectiontop,
        behavior: "smooth"
      })
    },
    handleScroll() {
      // Check if the user has scrolled down
      this.scrolledDown = window.scrollY > 100;
      // Check if the scroll button should be shown
      this.showScrollButton = window.scrollY > 100 || window.scrollY < 100;
    },
    scrollToTop() {
      window.scrollTo({
        top:0,
        behavior: "smooth"
      })
    },
    goTo(routename) {
      router.push(routename)
    },
  },
  components: {
    NavBar,
    LottieVue,
    LottieVue3
  },
}

</script>

<template>
  <div>
      <main class="image h-screen">
        <NavBar />

        <!-- content at the center -->
        <div class="flex items-center justify-center h-3/4">
          <div class="flex">
            <!-- to the left -->
            <div class="">
              <span class="text-sky-500 text-[70px] font-poppin font-bold uppercase text-center">
                token world
              </span>
              
              <span class="flex gap-5 text-white justify-center font-poppin text-3xl">
                <hr class="w-10 bg-sky-500"> Discover Unique Digital Assets, your gateway to the future of digital ownership. <br>
                Buy, sell, and trade unique NFTs securely and transparently. <br>
                Start your journey today with Token World.<br>
              </span>

            </div>
            <div class="flex flex-col items-end justify-center">
              <div class="grid grid-cols-4 gap-20">
                <div>
                  
                </div>
                <div class="absolute right-1/4 left-3/4 top-1/3 w-1/4 text-gray-400">
                  <a href="javascript:void(0)" @click="scrollToAbout">
                    <div class="mt-4 text-sm glass lg:w-3/4 lg:p-2 md:w-3/4 md:p-2 sm:w-3/4 sm:p-1">
                      <li class="uppercase">About Us</li>
                      <span class="pl-6 text-xs">Who we Are</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" @click="scrollToService">
                    <div class="mt-3 text-sm glass w-3/4 p-1">
                      <li class="uppercase">Services</li>
                      <span class="pl-6 text-xs">What we Do</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" @click="scrollToBenefits">
                    <div class="mt-3 text-sm glass w-3/4 p-1">
                      <li class="uppercase">Benefits</li>
                      <span class="pl-6 text-xs">Featured work</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" @click="scrollToContact">
                    <div class="mt-3 text-sm glass w-3/4 p-1">
                      <li class="uppercase">Contact Us</li>
                      <span class="pl-6 text-xs">Get in touch</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
                
      </main>
      <!-- about us -->
      <div class="bg-white h-screen font-poppin text-xl" id="about">
        <div class="p-10 grid grid-cols-2">
          <div class="p-0">
          <span class="text-sky-700 flex ">
            <hr class="w-10 bg-black mr-3">
            About Us
            <hr class="w-10 bg-black ml-3">
          </span>
          <br>
          <header class="text-5xl font-bold">Token World</header>
          <p>
            It's the system which offer and help your business to stand out world wide through the use of crypto currency - Atsh
            <br>
          </p>
          <br>
          <span class="text-sky-700 flex ">
            <hr class="w-10 bg-black mr-3">
            How to Use
            <hr class="w-10 bg-black ml-3">
          </span>
          <br>
          <p>
            Using Token World is very simple and easy... Follow the steps below;
            <br>
          </p>
          <div class="flex">
            <span class="text-sky-700">Step 1:</span>
            <p class="pl-3"> If your new to the Token World, make sure you register 
              your company and fill the necessary information as required.
              For example your company name, company logo (optional), country etc
            </p>
          </div>
          <div class="flex">
            <span class="text-sky-700">Step 2:</span>
            <p class="pl-3"> Once you have registred your company, it will be known 
              world-wide that is any person from elsewhere will be able to purchase anything using Atsh</p>
          </div>
          <div class="flex">
            <span class="text-sky-700">Step 3:</span>
            <p class="pl-3"> You can purchase anything immediately or you can keep it 
              in cart, and then later purchase it as per your wallet</p>
          </div>
          <br>
          <span>And you will be done, and good to go.</span>
          </div>
          <LottieVue class="h-11/12 w-11/12"/>
        </div>
      </div>
      
      <!-- service -->
      <div class="bg-gray-50 h-screen font-poppin text-xl" id="service">
        <div class="p-10">
          <span class="text-sky-700 flex ">
            <hr class="w-10 bg-black mr-3">
            Our Services
            <hr class="w-10 bg-black ml-3">
          </span><br>
          <div class="pt-1 grid grid-cols-3 gap-10 md:gap-y-8 md:grid-cols-3 md:text-xl sm:grid-cols-2 sm:gap-y-4 sm:text-sm">
            <div class="w-full">
              <div class="p-4 border-2 rounded-lg border-sky-400 shadow-md shadow-blue-900 flex grid-cols-2 items-center justify-evenly">
                <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
                <span>Create NFT Tokens</span>
              </div>
            </div>
            <div class="w-full">
              <div class="p-4 border rounded-lg border-sky-400 shadow-md shadow-blue-900 flex grid-cols-2 items-center justify-evenly">
                <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
                <span>Mint NFT Items</span>
              </div>
            </div>
            <div class="w-full">
              <div class="p-4 border rounded-lg border-sky-400 shadow-md shadow-blue-900 flex grid-cols-2 items-center justify-evenly">
                <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
                <span>Exchange Tokens</span>
              </div>
            </div>
            <div class="w-full">
              <div class="p-4 border rounded-lg border-sky-400 shadow-md shadow-blue-900 flex grid-cols-2 items-center justify-evenly">
                <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
                <span>Trace Ownership of Tokens</span>
              </div>
            </div>
            <div class="w-full">
              <div class="p-4 border rounded-lg border-sky-400 shadow-md shadow-blue-900 flex grid-cols-2 items-center justify-evenly">
                <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
                <span>Handle Taxation of Exchanges</span>
              </div>
            </div>
          </div><br><br>
          <span class="text-sky-700 flex ">
            <hr class="w-10 bg-black mr-3">
            Types of NFT Token
            <hr class="w-10 bg-black ml-3">
          </span><br>
          <div class="pt-1 grid grid-cols-3 gap-10 md:gap-y-8 md:grid-cols-3 md:text-xl sm:grid-cols-2 sm:gap-y-4 sm:text-sm">
            <div class="w-full cursor-pointer" @click="goTo('/Products')">
              <i class="fa-solid fa-group-arrows-rotate text-4xl text-sky-600"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-950">
                <div class="pl-5">
                  <span class="text-sky-600">NFT Product - Commodity Exchange</span> <br>
                  Platforms for buying, selling, and trading different tokens. They often 
                  offer features like market orders, limit orders, and trading pairs
                </div>
              </div>
            </div>
            <div class="w-full cursor-pointer" @click="goTo('/Assets-Investment')">
              <i class="fa-solid fa-sack-dollar text-4xl text-sky-950"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-600">
                <div class="pl-5">
                  <span class="text-sky-700">NFT Asset Investment</span> <br>
                  Platforms for buying, selling, and trading different tokens. They often 
                  offer features like market orders, limit orders, and trading pairs
                </div>
              </div>
            </div>
            <div class="w-full cursor-pointer" @click="goTo('/Services')">
              <i class="fa-solid fa-list-check text-4xl text-sky-600"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-950">
                <div class="pl-5">
                  <span class="text-sky-600">NFT Services</span> <br>
                  Platforms for buying, selling, and trading different tokens. They often 
                  offer features like market orders, limit orders, and trading pairs
                </div>
              </div>
            </div>
            <!-- <div class="w-full">
              <i class="fa-brands fa-codepen text-4xl text-sky-600"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-950">
                <div class="pl-5">
                  <span class="text-sky-600">Marketing</span>
                </div>
              </div>
            </div>
            <div class="w-full">
              <i class="fa fa-briefcase text-4xl text-sky-950"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-600">
                <div class="pl-5">
                  <span class="text-sky-950">Business</span>
                </div>
              </div>
            </div>
            <div class="w-full">
              <i class="fa fa-wallet text-4xl text-sky-600"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-950">
                <div class="pl-5">
                  <span class="text-sky-600">Cryptocurrency Wallet</span><br>
                  Provide secure storage and management of various tokens, allowing 
                  users to send, receive, and manage their digital assets.
                </div>
              </div>
            </div>
            <div class="w-full">
              <i class="fa fa-shield text-4xl text-sky-950"></i>
              <div class="mt-2 ml-2 border-l-4 rounded-sm border-sky-600">
                <div class="pl-5">
                  <span class="text-sky-950">Security</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- benefits -->
      <div class="bg-white h-screen font-poppin text-xl" id="benefits">
        <div class="flex grid-cols-2">
          <div class="p-10 w-3/4">
            <span class="text-sky-700 flex ">
              <hr class="w-10 bg-black mr-3">
              Benefits of using Token World
              <hr class="w-10 bg-black ml-3">
            </span>
            <br>
            <p>
              There are lot of benefits when you begin to use Token World
            </p>
            <div class="p-3">
              <li class="pb-4">
                <span class="text-black">            
                  Commodity Exchange with the Atsh Stable coin
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">  
                  With Atsh Stable coin you will benefit different serviecs 
                  offered by different collections all over the world, such as special membership         
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">  
                  Token world, assist in the Asset Investment plan by investing in 
                  real estates, stocks, bonds, etc using Atsh coin         
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">
                  Enhances transparent and immutable record of ownership and transaction history. 
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">
                  Provides robust security features, such as cryptographic encryption 
                  and distributed consensus mechanisms, which protect your assets from fraud, 
                  tampering, and unauthorized access
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">
                  Enables assets to be tokenized and traded across borders, eliminating geographical 
                  barriers and expanding investment opportunities on a global scale
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">
                  Reduces costs associated with asset issuance, management, and transfer by automating 
                  processes, eliminating intermediaries, and reducing administrative overhead
                </span>
              </li>
              <li class="pb-4">
                <span class="text-black">
                  It fosters innovation by unlocking new use cases and business models that were not possible 
                  with traditional assets. This includes decentralized finance (DeFi), non-fungible tokens (NFTs), 
                  and tokenized securities, among others
                </span>
              </li>
            </div>
          </div>
          <div class="w-1/4">
            <LottieVue3 class="h-3/4 w-full"/>
          </div>
        </div>
        <!-- <div class="items-center w-full h-full flex flex-col">
          <div class="w-full"> 
            <div class="cards justify-evenly p-10">
                <div @click="router.push('/Products')" class="card red">
                  <strong>Product</strong>
                  <div>With Atsh Stable coin benefit commodity exchanges </div>
                </div>
                <div class="card blue">
                  <strong>Asset Investment</strong>
                  <div>With Atsh Stable coin begin your asset investments by investing in real 
                    estates, stocks, bonds ,etc using our stable coin </div>
                </div>
                <div class="card green">
                  <strong>Services</strong>
                  <div>With Atsh Stable coin benefit different services offered by differnt collections such as special membership</div>

                </div>
            </div>
          </div>
        </div> -->
      </div>

      <button v-if="showScrollButton" class="fixed transit-btn bottom-10 right-10 bg-sky-300 cursor-pointer outline-none rounded-full w-10 h-10 
      bounce-animation" @click="scrollToTop">
        <i v-if="scrolledDown" class="fa fa-arrow-up text-md text-white"></i>
        <i v-else class="fa fa-arrow-down text-md text-white"></i>
      </button>

      <button v-else class="fixed transit-btn bottom-10 right-10 bg-sky-300 cursor-pointer outline-none rounded-full w-10 h-10 
      bounce-animation" @click="scrollDown">
        <i v-if="scrolledDown" class="fa fa-arrow-up text-md text-white"></i>
        <i v-else class="fa fa-arrow-down text-md text-white"></i>
      </button>

    <!-- footer -->
    <footer id="contact" class="bottom-0 font-poppin bg-sky-950 text-white " style="background-color: #0D1042">
      <div class="p-20">
        <span class="text-3xl flex">
          <hr class="w-10 bg-black mr-3">
          AlphaChain
          <hr class="w-10 bg-black ml-3">
        </span>
        <div class="pt-10 grid grid-cols-3 gap-10">
          <div class="">
            <span class="text-xl">Follow us on:</span> 
            <div class="flex pt-4">
              <button class="border w-12 h-12 rounded-full ml-6">
                <i class="fa-brands fa-facebook-f text-xl"></i>
              </button>
              <button class="border w-12 h-12 rounded-full ml-6">
                <i class="fa-brands fa-instagram text-xl"></i>
              </button>
              <button class="border w-12 h-12 rounded-full ml-6">
                <i class="fa-brands fa-linkedin-in text-xl"></i>
              </button>
              <button class="border w-12 h-12 rounded-full ml-6">
                <i class="fa-brands fa-x-twitter text-xl"></i>
              </button>
            </div>
          </div>
          <div class="grid gap-y-2 text-xl">
            <span>Faucet</span>
            <span>dApps</span>
            <span>Wallet</span>
            <span>Explorer</span>
          </div>
          <div class="">
            <span class="text-4xl font-semibold">
              Join Our Community
            </span>
            <br>
            <div class="grid gap-y-4">
              <button class="bg-sky-700 w-1/2 text-xl rounded-lg p-2">Join Discord</button>
              <button class="bg-sky-700 w-2/3 text-xl rounded-lg p-2">Add AlphaChain Network</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto text-center">
        <p class="bottom-0">Token World. <br>
          Developed and maintained by eGA-RIDC, Copyright © 2024 eGA-RIDC
        </p>
      </div>
    </footer>

  </div>
  
</template>

<style scoped>
.transit-btn{
  outline: none;
  transition: 0.9s ease;
}
.font-poppin{
  font-family: 'Roboto';
}
.glass {
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(5px); /* Apply blur effect to mimic frosted glass */
  transition: background-color 0.3s ease, color 0.3s ease;
}
.glass li::marker,li {
  color: lightskyblue; /* Set the color of the bullet */
}
/* .glass:hover {
  background: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 1); 
} */

.image{
  background-image: url('../assets/block7.jpg');
  background-repeat: no-repeat
}

.coin-image {
  background-image: url("../assets/images/img.jpg");
  background-repeat: no-repeat;
  background-size: cover
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce-animation {
  animation: bounce 1s infinite;
}

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
