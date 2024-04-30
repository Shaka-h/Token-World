<template>
    <div v-if="!viewAllCollections" class="mt-3 w-full">
        <div class="flex justify-between"> 
          <div class="bg-white mx-4 font-bold"><span class="text-2xl">ITEMS</span> <span v-if="!viewAllProducts" @click="viewAllProducts = true" class="text-blue cursor-pointer ml-4">view all</span></div>
          <div @click="gobackItem()" v-if="viewAllProducts" class="px-2 py-1 rounded-lg text-white bg-primary2 mx-4 cursor-pointer">Back</div>
        </div>
          <table class="table table-report">
            <thead>
            <tr>
              <th class="whitespace-nowrap">No</th>
              <th class="whitespace-nowrap" v-for="(column, index) in columns" :key="index">
                {{ column }}
              </th>
              <th class="whitespace-nowrap" v-if="hasActions">{{ actions }}</th>
            </tr>
            </thead>
            <tbody v-if="listItem?.length === 0">
            <tr>
              <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="skeleton">
                <div class="h-4"></div>
              </td>
            </tr>
            </tbody>
            <tbody v-if="!listItem?.length">
            <tr>
              <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="text-center p-2">
                <span class="font-semibold text-base">{{ "NO ITEMS AVAILABLE" }}</span>
              </td>
            </tr>
            </tbody>
            <tbody v-if="listItem?.length">
              <tr class="intro-x" v-for="(data, index) of listItem" :key="index">
                <!-- {{ data[7] }} -->
                <td>{{ index + 1 }}</td>
                <td>{{ data[7].name }}</td>
                <td>{{ data[7].description }}</td>
                <td>{{ data[5] }}</td>
                <td>{{ data[5] }}</td>
                <td @click="viewProduct(data[1],data[0])" class="cursor-pointer">view</td>
              </tr>
            </tbody>
          </table>
      </div>
  
      <div v-if="!viewAllProducts"  class="mt-3" >
        <div class="flex justify-between"> 
          <div class="bg-white mx-4 mt-4 font-bold"><span class="text-2xl">COLLECTIONS</span> <span v-if="!viewAllCollections" @click="viewAllCollections = true" class="text-blue cursor-pointer ml-4">view all</span></div>
          <div @click="gobackCollection()" v-if="viewAllCollections" class="px-2 rounded-lg py-1 bg-primary2 text-white mx-4 cursor-pointer">Back</div>
        </div>
        <div class="flex">
          <div v-for="(item, index) of collections" :key="index" class=" pt-4 col-md-4 cursor-pointer flex" >   
            <div @click="viewCollection(item)" class="block card w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
              <div class="flex items-center">
                <img :src="'http://127.0.0.1:8080/ipfs/' + item.logo" alt="icon description" class="p-2 h-32 w-32 rounded-lg">
                <h5 class="mb-2 text-2xl font-bold tracking-tight ml-10 text-white dark:text-white">{{item.symbol}}</h5>
              </div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{{item.name}}</h5>
              <p class="font-normal text-white dark:text-gray-400">{{item.description}}</p>
            </div> 
          </div>
          <div v-if="!collections?.length" class="flex justify-center w-full mt-8 bg-white p-4"> 
            <span class="font-semibold text-base">{{ "NO COLLECTIONS AVAILABLE" }}</span>
          </div>
        </div>
      </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {getSignerContract} from '../../../scripts/ContractUtils';
import {ethers} from 'ethers';
import {nftMyCollection_ABI } from '@/scripts/ContractConstants'

let {signer, marketPlace_contract, nftFactory_contract} = getSignerContract();

const viewAllCollections = ref(false)
const viewAllProducts = ref(false)

const columns = ref({
  "name": 'Item Name',
  "description": 'Description',
  "price": 'Price',
  "currentBiddingPrice": 'Current Offer'
})

const router = useRouter();
const viewProduct = (itemcontract, itemIdentity) => {
  console.log(itemcontract)
  router.push(`/auction/${itemcontract}/${itemIdentity}`)
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
const listItem = ref([])
onMounted(async () => {
  tableData.value = await marketPlace_contract.fetchAuctionItemsUnsold();
  console.log(tableData.value, "token");

  collections.value = await nftFactory_contract.getAllDeployedNFTCollections();
  console.log(collections.value, "collection");

  const promises = tableData.value.map(async (item) => {
    const result = [...item];
    const responseData = await fetchToken(parseInt(item.itemId));
    result.push(responseData);
    console.log(result, "trial");
    return result;
  });

  listItem.value = await Promise.all(promises);
});

const fetchToken = async (itemId) => {
  const responseData = {}; // Array to store response data
  let item = await marketPlace_contract.idMarketItem(itemId);

  const nftMyCollection_contract = new ethers.Contract(item.nftContract, nftMyCollection_ABI, signer);

  let tokenURI = await nftMyCollection_contract.tokenURI(item.tokenId);
  console.log(tokenURI);

  try {
    const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenURI}`);
    const data = await response.json();
    // responseData.push(data); // Push data to responseData array
    return data

    console.log('Data for', tokenURI, ':', data);
    // Handle data as needed
  } catch (error) {
    console.error('Error fetching data from', router?.params?.tokenId, ':', error);
    // Handle error
  }

  console.log(responseData, "yuio");

  return responseData; // Return the array of response data
};

</script>

<style scoped>
.card{
  background: linear-gradient(-45deg, #1F6E8C 0%, #0D1042 100% );

}
</style>