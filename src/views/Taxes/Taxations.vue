<template>
    <div class="p-2"> 
      <div class="flex w-full p-2 justify-between mt-2">
        <div class="flex space-x-8 w-full"> 
            <div class="font-bold text-2xl">TOTAL TAX COLLECTED:</div>
            <div class="font-bold text-2xl">{{totalTax}}<span class="ml-2">Atsh</span></div>
        </div>
        
        <div class="flex space-x-2">
            <div @click="goBack" class="cursor-pointer py-1 px-2 bg-primary rounded-lg">Back </div>
                      
        </div>
      </div>
  
      <div class="flex w-full p-2 justify-between mt-8">
        

          <div class="flex space-x-8 w-full"> 
              <div class="font-bold">All</div>
              <div class="flex">
                <div class="font-bold">Filter by date:</div> 
                <span class="ml-2">From</span>
                <span><input class="border ml-2"/></span>
                <span class="ml-2">To</span>
                <span><input class="border ml-2"/></span>
              </div>
          </div>
          
          <div class="flex">
              <search-bar />
          </div>
      </div>
      <div  class="mt-3 w-full">
        <div class="flex justify-between"> 
          <div class="font-bold">TRANSACTIONS</div>
          <div @click="goBack" v-if="viewAllProducts" class="px-2 rounded-lg bg-primary cursor-pointer">Back</div>
        </div>
        <simple-table :columns="columns" :table-data="allTaxes" :has-search="false">
          
        </simple-table>
      </div>
    </div>

    
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import {getSignerContract} from '../../scripts/ContractUtils';

let {signer, marketPlace_contract, atsh_contract} = getSignerContract();

const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)
const viewAllCollections = ref(false)
const viewAllProducts = ref(false)

const columns = ref({
  "from": 'From',
  "to": "To",
  "price": 'Price',
  "tax": 'Tax',
  "date": "Date"
})
const router = useRouter();
const viewProduct = (item) => {
  console.log(item.tokenId)
  router.push(`/item/${item.tokenId}`)
}
const viewCollection = (item) => {
  console.log(item)
  router.push(`/collection/${item.tokenId}`)
}

const tableData = ref([
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
  {
    "itemName": 'Iphone 14',
    "collection": 'Mac',
    "price": "25000 Atsh",
    "from": '0x28304089335d7f441544fCc828D46449DD79385F',
    "to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    "actualPrice": '25000 Atsh',
    "tax": '100 Atsh',
    "date": "12/04/2024"
  },
]);

const allTaxes = computed(() => {
  return getStoreItem.value("allTaxes")
}); 

const totalTax = computed(() => {
  return getStoreItem.value("totalTax")
}); 

onBeforeMount(async () => {

  // await NFTStore.loadACollections(route?.params?.collectionId); 
    await NFTStore.loadAllSales();
    await NFTStore.loadTotalTax();


onMounted(async () => {
    marketPlace_contract.on("itemSold", async () => {
        await NFTStore.loadItem({
            collectionId: router?.params?.collection,
            tokenId: router?.params?.tokenId
        });

        await NFTStore.loadItemSales(router?.params?.tokenId);
    })
  
})
});

</script>
