<template>
    <div class="px-4 pb-4">
        <div class="flex justify-end space-x-3">
            <div  @click="router.push('/create')" class="bg-primary2 text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                Add Collection
            </div>
            <div @click="goBack" class="bg-primary text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                Back
            </div>
        </div>
    
        <div class="row"> 
            <div @click="router.push(`/profile/${myCollection.NftContract}`)" v-for="(myCollection, index) of myCollections" :key="index" class="card col-md-4 hover:bg-gray hover:p-3 p-2 my-2 cursor-pointer" style="">   

                <div class="border rounded-lg p-2 ">
                    <div class="my-2 space-x-4 flex items-center ">
                        <div class="border p-2 flex items-center justify-center h-32 w-32"> 
                            <img :src="'http://127.0.0.1:8080/ipfs/' + myCollection.logo" alt="" class="">
                        </div> 
                        <div class="flex flex-col"> 
                            <div class="font-bold text-2xl">{{myCollection[2]}}</div>
                            <div class="font-bold text-2xl">{{myCollection[3]}}</div>
                        </div>
                    </div>
                    <div class="flex flex-col"> 
                        <div class="mt-4"> 
                            {{myCollection[5]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 

<script setup>
import NavBar from '@/components/NavBar.vue';
import { computed, onMounted, ref, onBeforeMount } from 'vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { useRouter } from 'vue-router';
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import CreateItem from '@/views/Create/CreateItem.vue';
import { getSignerContract } from '@/scripts/ContractUtils.js';

let { nftFactory_contract, DSCEngine_contract, DecentralizedStableCoin_contract, signer } = getSignerContract();

const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)
const showMint = ref(false)

const router = useRouter()


const tokens = ref([])


const viewProduct = (item) => {
    console.log(item);
//   console.log(item.tokenId)
//   router.push(`/item/${item.tokenId}`)
}

const fetchData = async () => {
    const responseData = []; // Array to store response data

    for (const item of tokens.value) {
        try {
            const response = await fetch(`http://127.0.0.1:8080/ipfs/${item}`);
            const data = await response.json();
            responseData.push(data); // Push data to responseData array
            console.log('Data for', item, ':', data);
            // Handle data as needed
        } catch (error) {
            console.error('Error fetching data from', item, ':', error);
            // Handle error
        }
    }
    return responseData; // Return the array of response data
};


const myCollections = computed(() => {
  return getStoreItem.value("myCollections")
});

  

onBeforeMount(async () => {

  await NFTStore.loadMyCollections(await NFTStore.getConnectedAddress()); 

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

.mint{
    height: 100%;
    
}

.mintNot{
    height:0%
}
</style>
 