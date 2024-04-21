<template>
    <NavBar />
    <Nav2 />
    <div class="flex w-full p-2 justify-end mt-2">
                
        <div class="flex">
            <search-bar />
        </div>
    </div>
    <div v-if="!viewAllCollections" class="mt-3 w-full">
      <div class="flex justify-between"> 
        <div class="bg-white mx-4 font-bold">ITEMS<span v-if="!viewAllProducts" @click="viewAllProducts = true" class="text-blue cursor-pointer ml-4">view all</span></div>
        <div @click="gobackItem()" v-if="viewAllProducts" class="px-2 py-1 rounded-lg text-white bg-primary2 mx-4 cursor-pointer">Back</div>
      </div>
      <simple-table :columns="columns" :table-data="tableData" :has-search="false">
        <template v-slot:actions="{itemData}">
          <div class="">
            <div class="flex items-center">
                <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer" @click="viewProduct(itemData)">
                <svg-icon name="view" height="h-5" width="w-5" class="mr-1 hover:border-b" color="#257ae4"></svg-icon>
                  view 
              </span>
            </div>
          </div>
        </template>
      </simple-table>
    </div>

    <div v-if="!viewAllProducts"  class="mt-3"> 
      <div class="flex justify-between"> 
        <div class="bg-white mx-4 font-bold">COLLECTIONS<span v-if="!viewAllCollections" @click="viewAllCollections = true" class="text-blue cursor-pointer ml-4">view all</span></div>
        <div @click="gobackCollection()" v-if="viewAllCollections" class="px-2 rounded-lg py-1 bg-primary2 text-white mx-4 cursor-pointer">Back</div>
      </div>
      <div class="flex">
        <div v-for="(item, index) of collections" :key="index" class="justify-evenly p-10 col-md-3 cursor-pointer" style="">   
          <div @click="viewCollection(item)" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex items-center">
              <img :src="'http://127.0.0.1:8080/ipfs/' + item.logo" alt="icon description" class="p-2 h-32 w-32">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{item.symbol}}</h5>
            </div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{item.name}}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{item.description}}</p>
          </div>
            
        </div>
      </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {getSignerContract} from '../../scripts/ContractUtils';

let {marketPlace_contract,nftFactory_contract} = getSignerContract();


const viewAllCollections = ref(false)
const viewAllProducts = ref(false)

const columns = ref({
  "name": 'Item Name',
  "description": 'Description',
  "seller": 'Owner',
  "price": 'Price',
  "currentBiddingPrice": 'Current Offer'
})
const router = useRouter();
const viewProduct = (item) => {
  console.log(item.itemId)
  const itemID = item.itemId.toNumber()
  router.push(`/item/${itemID}`)
}
const viewCollection = (item) => {
  console.log(item.NftContract)
  router.push(`/collection/${item.NftContract}`)
}


const gobackCollection = () => {
  console.log(viewAllCollections.value, viewAllProducts.value)
  if(viewAllCollections ){
    viewAllCollections.value = false
  }
  else {
    viewAllProducts.value = false
  }
}


const gobackItem = () => {
  console.log(viewAllCollections.value, viewAllProducts.value)
  if(viewAllProducts ){
    viewAllProducts.value = false
  }
  else {
    viewAllProducts.value = false
  }
}

const tableData = ref([])

const collections = ref ([])
onMounted (async () => {
  tableData.value = await marketPlace_contract.fetchMarketItemsUnsold();
  console.log(tableData.value);

  collections.value = await nftFactory_contract.getAllDeployedNFTCollections();
  console.log(collections.value, "collecton");

})
</script>