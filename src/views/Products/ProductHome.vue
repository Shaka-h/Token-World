<template>
    <div class="flex w-full p-2 justify-end mt-2">
        <div class="flex">
            <search-bar />
      </div>
    </div>

    <div class="flex">         
        <template v-for="(component, index) of components" :key="index" >
          <div v-if="component.id === activeComponent" class="cursor-pointer border py-2 px-3 ml-2 text-white rounded-lg bg-primary2">
            <div>{{component.name}}</div>
          </div>

          <div v-else class="cursor-pointer border ml-2 py-2 px-3 rounded-lg" @click="activeComponent=component.id">
              <div>{{component.name}}</div>
          </div>
        </template>
    </div>

          
    <div v-if="activeComponent==='auction'" class="mt-8"> 
      <Auction />
    </div>

    <div v-if="activeComponent==='market'" class="mt-4"> 
        <Market />
    </div>

    
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {getSignerContract} from '../../scripts/ContractUtils';
import {ethers} from 'ethers';
import {nftMyCollection_ABI } from '@/scripts/ContractConstants'
import Auction from '@/views/Products/Aution/AuctionHome.vue'
import Market from '@/views/Products/Market/MarketHome.vue'

let {signer, marketPlace_contract, nftFactory_contract} = getSignerContract();

const activeComponent = ref('market');
const components = ref([
    {
        name: "Market",
        id: "market",
    },
    {
        name: "Auction",
        id :"auction",
    }
])


const router = useRouter();


const tableData = ref([])


const collections = ref ([])
const listItem = ref([])
onMounted(async () => {
  tableData.value = await marketPlace_contract.fetchMarketItemsUnsold();
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