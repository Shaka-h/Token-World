<template>
    <div class="px-4 pb-4">
      <div class="flex flex-row">
        <template v-for="(tab, index) of activity" :key="index">
          <button class="primary2-action-btn mx-1 intro-x" v-if="tab.id === activeTab">
            {{ tab.name }}
           </button>
          <button class="primary-action-btn mx-1" v-else @click="activeTab = tab.id">
            {{ tab.name }}
         </button>
        </template>
      </div>

        <div>
            <div v-if="activeTab === 'details'" class="flex " style="height: 60vh">
                <div class="flex items-center justify-center border m-2 rounded-lg" style="width: 50%"> 
                    <img :src="`http://127.0.0.1:8080/ipfs/${itemData?.itemImage}`" alt="icon description" class="p-2 h-64">
                </div>

                <div class="flex flex-col" style="width: 50%"> 
                    <div class="ml-2 mt-2 font-bold text-2xl">{{itemData?.name}}</div>

                    <div class="flex h-full">
                     <div class="flex flex-col p-2 border mx-2 mt-3 w-full rounded-lg"> 
                         
                         <div class="flex flex-col "> 
                             <div>Creator:</div>
                             <div>{{ itemData?.seller }}</div>
                         </div>
                         <div class="mt-2">Description</div>
                         <div> 
                            {{ itemData?.description }}
                         </div>
         
                         <div class="mt-4">Token Id: <span class="ml-2">{{ itemData?.tokenId }}</span></div>
                         
                         <div>Number of sales:<span class="ml-2">{{ salesMadeToItem?.length }}</span></div>
                         <div class="flex flex-col mt-2"> 
                            <div>Owner:</div>
                            <div>{{ itemData?.owner }}</div>
                        </div>
                        <div class="row"> 
                            <div class="mt-4 flex flex-col col-md-3"> 
                                <span class="font-bold">Price: </span>
                                <span>{{ itemData?.total  }} Eth </span>
                            </div>
                            <div class="mt-4 flex flex-col col-md-3"> 
                                <span class="font-bold">Fees: </span>
                                <span>{{ itemData?.tax }} Eth </span>
                            </div>                            
                            <div class="mt-4 flex flex-col col-md-3"> 
                                <span class="font-bold">Total: </span>
                                <span>{{ itemData?.price}} Eth </span>
                            </div>
                        </div>
                         <div class="flex gap-4 mt-8">                         
                           <div  class="flex space-x-4">
                               <div v-if="itemData?.sold" @click="payAtsh()" class="border py-1 px-4 bg-indigo rounded-lg bg-primary2 cursor-pointer">Sell</div>
                            </div> 
                            <div  class="flex space-x-4">
                                <div v-if="!itemData?.sold" @click="buyItem()" class="border py-1 px-4 bg-indigo rounded-lg bg-primary2 cursor-pointer">Buy</div>
                             </div> 
                        </div>

                     </div>
                                      
                     
                    </div>
                </div>
            </div>
    
            <div v-if="activeTab === 'sales' " class="mt-8"> 
                <div class="flex justify-between"> 
                    <div class="font-bold text-xl">Sales</div>
                </div>
                <div> 
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
                        <tbody v-if="salesMadeToItem?.length === 0">
                        <tr>
                          <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="skeleton">
                            <div class="h-4"></div>
                          </td>
                        </tr>
                        </tbody>
                        <tbody v-if="!salesMadeToItem?.length">
                        <tr>
                          <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="text-center p-2">
                            <span class="font-semibold text-base">{{ "NO SALES YET" }}</span>
                          </td>
                        </tr>
                        </tbody>
                        <tbody v-if="salesMadeToItem?.length">
                          <tr class="intro-x" v-for="(data, index) of salesMadeToItem" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ data?.seller }}</td>
                            <td>{{ data?.buyer }}</td>
                            <td>{{ data?.total }}</td>
                            <td>{{ data?.time }}</td>

                        </tr>
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
    </div>
</template>
 

<script setup>
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref, computed, onBeforeMount } from 'vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { useRoute } from 'vue-router';
import {getSignerContract} from '../../../scripts/ContractUtils';
import {nftMyCollection_ABI, TRA_walletAddress } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';
import axios from "axios";
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const activeTab = ref('details')
const activity = ref([
    {
        name: "Details",
        id: 'details'
    },

    {
        name: "Sales",
        id: 'sales'
    }
])

let {signer, marketPlace_contract, atsh_contract} = getSignerContract();

const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)

const router = useRoute()

const itemMarket = ref([]);

const columns = ref({
    "from": "From",
    "to": "To",
    "total": "Price",
    "time": "Time"
})

const itemMarketDetails = computed(() => {
  return itemMarket.value.map(details => {
    if (typeof details === 'object' && details._isBigNumber) {
      return { ...details, hex: parseInt(details._hex) };
    } else {
      return details;
    }
  });
});

const buyItem = async () => {
    const itemId = itemData.value?.price
    console.log(itemData.value, "IIIIIIIIIIIIIIII");
    
    console.log(router?.params?.tokenId, "00000000000000000000000000");
    const buy = await NFTStore.payAtsh({
        id: router?.params?.tokenId,
        total: parseInt(itemData.value?.price),
        seller: itemData.value?.seller,
        price: parseInt(itemData.value?.total),
        fees: parseInt(itemData.value?.tax)
    }); 
}


async function payAtsh() {
    await NFTStore.loadACollectionItem(route?.params?.collectionId); 

    const itemId = itemMarketDetails.value[0].hex
    const amount = itemMarketDetails.value[5]?.hex;
    const owner = itemMarketDetails.value[4];
    const seller = itemMarketDetails.value[3];
    const receipt = ref(owner);

    if (owner === "0x0000000000000000000000000000000000000000") {
        receipt.value = seller;
    }

    console.log(amount, "oofjij", itemMarketDetails.value[3]);
    console.log(receipt.value);

    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/',
            headers: {'Content-Type': 'application/json'},
            data: {
                amount: amount, 
                address: receipt.value
            }
        };


        // Use async/await directly inside the then block
        const response = await axios.request(options);
        console.log(response.data);
        console.log("after");

        // Now you can call buyItem using itemId from the outer scope
        const buy = await marketPlace_contract.buyItem(itemId);
        await buy.wait();

    } catch (error) {
        console.error('Error:', error.message);
    }
}



const itemData = computed(() => {
  return getStoreItem.value("item")
});  

const salesMadeToItem = computed(() => {
  return getStoreItem.value("itemSales")
}); 

onBeforeMount(async () => {

  // await NFTStore.loadACollections(route?.params?.collectionId); 
    await NFTStore.loadItem({
        collectionId: router?.params?.collection,
        tokenId: router?.params?.tokenId
    });

    await NFTStore.loadItemSales(router?.params?.tokenId);


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
 