<template>
  <div class="flex justify-end mt-4 space-x-3">
    <div @click="goBack" class="bg-primary text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
        Back
    </div>
</div>
  <div class="flex w-full p-2 justify-end mt-2">
      <div class="flex">
          <search-bar />
    </div>
  </div>

  <div class="mt-3" >
    <div class="flex justify-between"> 
      <div class="bg-white mx-4 mt-4 font-bold"><span class="text-2xl">COLLECTIONS</span></div>
      <div @click="gobackCollection()" v-if="viewAllCollections" class="px-2 rounded-lg py-1 bg-primary2 text-white mx-4 cursor-pointer">Back</div>
    </div>
    <div class="flex">
      <div v-for="(item, index) of allCollections" :key="index" class=" pt-4 col-md-4 cursor-pointer flex" >   
        <div @click="viewCollection(item)" class="block card w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
          <div class="flex items-center">
            <img :src="'http://127.0.0.1:8080/ipfs/' + item.logo" alt="icon description" class="p-2 h-32 w-32 rounded-lg">
            <h5 class="mb-2 text-2xl font-bold tracking-tight ml-10 text-white dark:text-white">{{item.symbol}}</h5>
          </div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{{item.name}}</h5>
          <p class="font-normal text-white dark:text-gray-400">{{item.description}}</p>
        </div> 
      </div>
      <div v-if="!allCollections?.length" class="flex justify-center w-full mt-8 bg-white p-4"> 
        <span class="font-semibold text-base">{{ "NO COLLECTIONS AVAILABLE" }}</span>
      </div>
    </div>
  </div>

</template>

<script setup>

import SearchBar from '@/components/SearchBar.vue';
import { computed, onMounted, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import {getSignerContract} from '../../../scripts/ContractUtils';

import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";

let {signer, marketPlace_contract, nftFactory_contract} = getSignerContract();

const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)
const viewAllCollections = ref(false)

const router = useRouter();

const viewCollection = (item) => {
  console.log(item.NftContract)
  router.push(`/collection/${item.NftContract}`)
}



// const tableData = ref([])


// const collections = ref ([])
// const listItem = ref([])
// onMounted(async () => {
//   tableData.value = await marketPlace_contract.fetchMarketItemsUnsold();
//   console.log(tableData.value, "token");

//   collections.value = await nftFactory_contract.getAllDeployedNFTCollections();
//   console.log(collections.value, "collection");

//   const promises = tableData.value.map(async (item) => {
//     const result = [...item];
//     const responseData = await fetchToken(parseInt(item.itemId));
//     result.push(responseData);
//     console.log(result, "trial");
//     return result;
//   });

//   listItem.value = await Promise.all(promises);
// });

// const fetchToken = async (itemId) => {
//   const responseData = {}; // Array to store response data
//   let item = await marketPlace_contract.idMarketItem(itemId);

//   const nftMyCollection_contract = new ethers.Contract(item.nftContract, nftMyCollection_ABI, signer);

//   let tokenURI = await nftMyCollection_contract.tokenURI(item.tokenId);
//   console.log(tokenURI);

//   try {
//     const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenURI}`);
//     const data = await response.json();
//     // responseData.push(data); // Push data to responseData array
//     return data

//     console.log('Data for', tokenURI, ':', data);
//     // Handle data as needed
//   } catch (error) {
//     console.error('Error fetching data from', router?.params?.tokenId, ':', error);
//     // Handle error
//   }

//   console.log(responseData, "yuio");

//   return responseData; // Return the array of response data
// };



const allCollections = computed(() => {
  return getStoreItem.value("allCollections")
});

  

onBeforeMount(async () => {

  await NFTStore.loadAllCollections(await NFTStore.getConnectedAddress()); 

})

onMounted(async () => {
//   const profileContract = await NFTStore.loadMyProfileContract(await NFTStore.getConnectedAddress()); 
//   const nftMyProfile_contract = new ethers.Contract(profileContract, nftMyProfile_ABI, signer);

    nftFactory_contract.on("NFTDeployed", async () => {
        await NFTStore.loadMyCollections(await NFTStore.getConnectedAddress()); 
})
  
})

</script>

<style scoped>
.card{
  background: linear-gradient(-45deg, #1F6E8C 0%, #0D1042 100% );

}
</style>