<template>
    <div class="px-4 pb-4">

        <div class="flex justify-between w-full"> 
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
        </div>

        <div>
            <div v-if="activeTab === 'detail' " class="flex " style="height: 60vh"> 
    
    
                <div class="flex items-center justify-center border m-2 rounded-lg" style="width: 40%"> 
                    <img :src="`http://127.0.0.1:8080/ipfs/${itemData[0]?.symbolCID}`" alt="icon description" class="p-2 h-64">
                </div>

                <div class="flex flex-col" style="width: 60%"> 
                    <div class="ml-2 mt-2 font-bold text-2xl">{{itemData[0]?.name}}</div>

                    <div class="flex h-full">
                     <div class="flex flex-col p-2 border mx-2 mt-3 w-1/2 rounded-lg"> 
                         
                         <div class="flex flex-col "> 
                             <div>Creator:</div>
                             <div>{{ itemMarketDetails[3] }}</div>
                         </div>
                         <div class="mt-2">Description</div>
                         <div> 
                            {{ itemData[0]?.description }}
                         </div>
         
                         <div class="mt-4">Token Id: <span class="ml-2">{{ itemMarketDetails[2]?.hex }}</span></div>
                         
                         <div>Number of Offers:<span class="ml-2">{{ offersMadeToItem?.length }}</span></div>
                         <div class="flex flex-col mt-2"> 
                            <div>Owner:</div>
                            <div>{{ itemMarketDetails[4] }}</div>
                        </div>
                     </div>
                     <div v-if="!itemMarketDetails[6]"  class="flex flex-col w-1/2 p-2 border items-center justify-center mx-2 bg-green  mt-3 rounded-lg">
                        <div class="font-bold text-xl p-y2 px-4 m-1 mb-2">ITEM SOLD</div>
                    </div>

                     <div v-if="itemMarketDetails[6]" class="flex flex-col w-1/2 p-2 border mx-2 mt-3 rounded-lg"> 
                         <div class="mt-4 font-bold">Price: {{ itemMarketDetails[5]?.hex }} Atsh </div>
                         <div>Current Bidding: <span class="ml-2">{{ itemMarketDetails[9]?.hex }} Atsh</span></div>
                         
                         <div class="space-x-2 mt-4"> 
                             <label>My Offer</label>
                             <input type="number" class="border" :value="offer" @input="offer=$event.target.value"/>
                         </div>
                         <div> 
                             <input />
                         </div>
                         <div  class="flex space-x-4">
                            <div @click="makeOffer()" class="border py-1 px-4 bg-indigo rounded-lg bg-primary2 cursor-pointer">Make Offer</div>
                         </div> 
                     </div>
                     
                    </div>
                </div>
            </div>
    
            <div v-if="activeTab === 'offers' " class="mt-8"> 
                <div class="flex justify-between"> 
                    <div class="font-bold text-xl">Offers</div>
                    <div v-if="!itemMarketDetails[6]" @click="closeAuction()" class="border py-1 px-4 bg-primary text-white rounded-lg mb-4 cursor-pointer">Close Auction</div>
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
                        <tbody v-if="offersMadeToItem?.length === 0">
                        <tr>
                          <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="skeleton">
                            <div class="h-4"></div>
                          </td>
                        </tr>
                        </tbody>
                        <tbody v-if="!offersMadeToItem?.length">
                        <tr>
                          <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="text-center p-2">
                            <span class="font-semibold text-base">{{ "NO ITEMS AVAILABLE" }}</span>
                          </td>
                        </tr>
                        </tbody>
                        <tbody v-if="offersMadeToItem?.length">
                          <tr class="intro-x" v-for="(data, index) of offersMadeToItem" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ data[2].hex }}</td>
                            <td>{{ data[3] }}</td>
                            <td>{{ data[5].hex }}</td>
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
import { onMounted, ref, computed } from 'vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { useRoute } from 'vue-router';
import {getSignerContract} from '../../../scripts/ContractUtils';
import {nftMyCollection_ABI, marketPlace } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';

const activeTab = ref('details')
const activity = ref([
    {
        name: "Details",
        id: 'details'
    },
    {
        name: "Offers",
        id: 'offers'
    }
])

let {signer, marketPlace_contract, atsh_contract} = getSignerContract();


const router = useRoute()
const itemData = ref([])
const nftMyCollection_contract = new ethers.Contract(router?.params?.collection, nftMyCollection_ABI, signer);

const offer = ref(0);

const itemDetails = ref();
const itemMarket = ref([]);
const offerMade = ref([])
const getOffersMade = ref([])

const columns = ref({
    "biddingPrice": "Bidding Price",
    "from": "From",
    "offerId": "Offer Id"
})

const fetchData = async () => {
    const responseData = []; // Array to store response data

    try {
        const response = await fetch(`http://127.0.0.1:8080/ipfs/${itemDetails.value}`);
        const data = await response.json();
        responseData.push(data); // Push data to responseData array
        console.log('Data for', router?.params?.tokenId, ':', data);
        // Handle data as needed
    } catch (error) {
        console.error('Error fetching data from', router?.params?.tokenId, ':', error);
        // Handle error
    }
    return responseData; // Return the array of response data
};


const itemMarketDetails = computed(() => {
  return itemMarket.value.map(details => {
    if (typeof details === 'object' && details._isBigNumber) {
      return { ...details, hex: parseInt(details._hex) };
    } else {
      return details;
    }
  });
});

const offersMadeToItem = computed(() => {
    return getOffersMade.value.map(eachOffer => {
    return eachOffer.map(offer => {
        if (typeof offer === 'object' && offer._isBigNumber) {
        return { ...offer, hex: parseInt(offer._hex) };
        } 
        else {
        return offer;
        }
    });
    });
});

onMounted(async () => {
    itemMarket.value = await marketPlace_contract.idAuctionItem(router?.params?.tokenId);
    console.log(itemMarket.value, "market");
    
    itemDetails.value = await nftMyCollection_contract.getTokenURIById(parseInt(itemMarket.value.tokenId));
    console.log(itemDetails.value, "item"); 
    await fetchData().then((responseData) => {
        console.log('All response data:', responseData);
        itemData.value = responseData
    });

   

    // for (const item of itemMarket.value) {
    //   console.log(typeof item, "itemmmmmm", item._isBigNumber); 
    // }
    getOffersMade.value = await marketPlace_contract.getAllOffersMade(router?.params?.tokenId);
    console.log(getOffersMade.value, "All offers made"); 

    for (const offer of getOffersMade.value) {
        for (const offerDetail of offer) {
            console.log(offerDetail); 
        }
    }
});

const makeOffer = async () => {
    // Now you can make atsh payment from atsh contract
    const pay = await atsh_contract.transferWei(marketPlace, offer.value);
    await pay.wait();
    
    let receipt = await marketPlace_contract.makeOffer(router?.params?.tokenId, offer.value, { value: offer.value });
    offerMade.value = await receipt.wait()
    console.log(offerMade.value, "offer made"); 
    window.location.reload();

    for (const offer of offerMade.value) {
        for (offerDetail of offer) {
            console.log(typeof offerDetail, "itemmmmmm"); 
        }
    }

}

const closeAuction = async () => {
    let closeAuction = await marketPlace_contract.acceptOffer(router?.params?.tokenId, router?.params?.collection);
    const output = await closeAuction.wait()
    console.log(output, "offer made"); 
    window.location.reload();

}



</script>
 