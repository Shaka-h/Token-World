<template>
    <NavBar />
    <div class="px-4 pb-4">
        <div class="flex justify-end mt-4 space-x-3">
            <div @click="router.push('/cart/1')" class="bg-primary2 text-white py-1 px-2 rounded-lg cursor-pointer">My Offers</div>
            <div @click="goBack" class="bg-primary text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                Back
            </div>
        </div>
        <div> 
            <div class="flex" style="height: 60vh"> 
    
    
                <div class="flex items-center justify-center border m-2 rounded-lg" style="width: 40%"> 
                    <img :src="`http://127.0.0.1:8080/ipfs/${itemData[0]?.symbolCID}`" alt="icon description" class="p-2 h-64">
                </div>

                <div class="flex flex-col" style="width: 60%"> 
                    <div class="ml-2 mt-2 font-bold text-2xl">{{itemData[0]?.name}}</div>

                    <div class="flex h-full">
                     <div class="flex flex-col p-2 border mx-2 mt-3 rounded-lg"> 
                         <div>
                             <span>Collection:</span>
                             <span class="ml-4">SHAKA</span>
                         </div>
                         <div class="flex flex-col "> 
                             <div>Creator:</div>
                             <div>{{ itemMarketDetails[3] }}</div>
                         </div>
                         <div class="mt-2">Description</div>
                         <div> 
                            {{ itemData[0]?.description }}
                         </div>
         
                         <div class="mt-4">Token Id: <span class="ml-2">{{ itemMarketDetails[2]?.hex }}</span></div>
                         <div>Current Bidding: <span class="ml-2">{{ itemMarketDetails[7]?.hex }}</span></div>
                         <div>Number of Offerings:<span class="ml-2">????</span></div>
                         <div class="flex flex-col mt-2"> 
                            <div>Owner:</div>
                            <div>{{ itemMarketDetails[3] }}</div>
                        </div>
                     </div>
         
         
                     <div class="flex flex-col  p-2 border mx-2 mt-3 rounded-lg"> 
                         <div class="mt-4 font-bold">Price: {{ itemMarketDetails[5]?.hex }} Atsh </div>
                         
                         <div class="space-x-2 mt-4"> 
                             <label>My Offer</label>
                             <input type="number" class="border" :value="offer" @input="offer=$event.target.value"/>
                         </div>
                         <div> 
                             <input />
                         </div>
                         <div class="flex space-x-4">
                            <div @click="makeOffer()" class="border py-1 px-4 bg-indigo rounded-lg bg-primary2 cursor-pointer">Make Offer</div>
                         </div>
                     </div>
                     
                    </div>
                </div>
            </div>
    
            <div class="mt-8"> 
                <div class="flex justify-between"> 
                    <div class="font-bold text-xl">Offerings</div>
                    <div class="border py-1 px-4 bg-primary text-white rounded-lg cursor-pointer">Close Auction</div>
                </div>
                <div> 
                    <simple-table :columns="columns" :table-data="tableData" :has-search="false">
                       
                      </simple-table>
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
import {getSignerContract} from '../../scripts/ContractUtils';
import {nftMyCollection_ABI } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';


let {signer, marketPlace_contract} = getSignerContract();


const router = useRoute()
const itemData = ref([])
const nftMyCollection_contract = new ethers.Contract(router?.params?.collection, nftMyCollection_ABI, signer);

const offer = ref(0);

const itemDetails = ref();
const itemMarket = ref([]);

const columns = ref({
    "biddingPrice": "Bidding Price",
    "from": "From"
})
const tableData = ref([
    {
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "floorDifference": "12% Below",
        "expiration": "in 12hrs",
        "from": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "floorDifference": "12% Below",
        "expiration": "in 12hrs",
        "from": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "floorDifference": "12% Below",
        "expiration": "in 12hrs",
        "from": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "floorDifference": "12% Below",
        "expiration": "in 12hrs",
        "from": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "floorDifference": "12% Below",
        "expiration": "in 12hrs",
        "from": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
])

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



onMounted(async () => {
    itemDetails.value = await nftMyCollection_contract.getTokenURIById(router?.params?.tokenId);
    console.log(itemDetails.value, "item"); 
    await fetchData().then((responseData) => {
        console.log('All response data:', responseData);
        itemData.value = responseData
    });

    itemMarket.value = await marketPlace_contract.idMarketItem(router?.params?.tokenId);
    console.log(itemMarket.value, "market");

    // for (const item of itemMarket.value) {
    //   console.log(typeof item, "itemmmmmm", item._isBigNumber); 
    // }


});

const makeOffer = async () => {
    itemMarket.value = await marketPlace_contract.makeOffer(router?.params?.tokenId, offer.value);
    console.log(itemMarket.value, "offer made"); 
}


</script>
 