<template>
    <div class="flex w-full justify-end">        
      <search-bar />
    </div>
    
    <div class="mt-3 w-full">
      <div class="bg-white">ITEMS </div>
      <simple-table :columns="columns" :table-data="collection" :has-search="false">
        <template v-slot:actions="{itemData}">
          <div class="">
            <div class="flex items-center">
                <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer" @click="viewProduct(itemData)">
                <svg-icon name="view" height="h-5" width="w-5" class="mr-1" color="#257ae4"></svg-icon>
                  view 
              </span>
            </div>
          </div>
        </template>
        <template v-slot:image="{itemData}">
                <img :src="'http://127.0.0.1:8080/ipfs/' + itemData?.itemData[0]?.imageCID"  alt="icon description" class="p-2 h-16">
          </template>
    </simple-table>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { onMounted, ref, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import { getSignerContract } from '@/scripts/ContractUtils.js';

const columns = ref({
    "image": "Image",
    "name": "Item Name",
    "description": "Description",
})
let { nftFactory_contract, marketPlace_contract} = getSignerContract();
const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)
const route = useRoute()
const router = useRouter()
const viewProduct = (item) => {
  console.log(item)
  router.push(`/market/${item?.nftContract}/${item?.itemId}`)
}

const collection = computed(() => {
  return getStoreItem.value("collection")
});  

onBeforeMount(async () => {

  // await NFTStore.loadACollections(route?.params?.collectionId); 

  await NFTStore.loadACollectionItem(route?.params?.collectionId); 


})

onMounted(async () => {
    marketPlace_contract.on("MarketItemCreated", async () => {
      await NFTStore.loadACollectionItem(route?.params?.collectionId); 
    })
  
})
</script>