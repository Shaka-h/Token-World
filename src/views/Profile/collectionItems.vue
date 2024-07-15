<template>
  <CreateItem @closeDialog="showMint=false" :open-dialog="showMint"></CreateItem>

    <!-- <ItemDetail @closeDialog="viewProduct=false" :open-dialog="viewProduct" :item-details="ItemDetail" ></ItemDetail> -->

    <div class="px-4 pb-4">
        <div class="flex justify-between my-2 ">
            <div class="flex items-center"> 
                <div @click="goBack" class="bg-primary text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                    Back
                </div>
                <div class="font-bold uppercase">Items for {{selectedCollection?.name}} collection</div>
            </div>
            <div class=""> 
                <div @click="mint" class="bg-primary2 text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                    Mint Item
                </div>
            </div>
        </div>
        <div class="row mt-8">
          <div @click="router.push(`/market/${myCollection.NftContract}`)" v-for="(item, index) of collectionItems" :key="index" class="col-md-3">
                <div class="card">
                  <div class="card-content-wrapper">
                    <div v-if="item.sold" class="">
                      <div class="flex justify-center bg-green px-4 font-bold">OFF MARKET</div>
                    </div>

                    <img :src="`${ipfsGateway}${item.imageCID}`" class="bg-black mt-4" style="height: 320px"></img>

                    <div class="card-title">{{item?.name}}</div>
                    <div class="card-price">
                      {{item?.price}}
                      <span>Atsh</span>
                    </div>

                  </div>
                  <button @click="showMore(item[1],item[0])"  class="card-btn">More info</button>
                </div>
            </div>
        </div>
    </div>
</template>
 

<script setup>
import NavBar from '@/components/NavBar.vue';
import { computed, onMounted, ref, onBeforeMount } from 'vue';
import {ipfsGateway} from "@/scripts/ContractConstants";
import { useRouter , useRoute} from 'vue-router';
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import CreateItem from '@/views/Create/CreateItem.vue';
import { getSignerContract } from '@/scripts/ContractUtils.js';
import ItemDetail from '@/views/Profile/ItemDetail.vue';

let { nftFactory_contract, marketPlace_contract} = getSignerContract();

const NFTStore = useNFTstore();
const { getStoreItem } = storeToRefs(NFTStore)
const showMint = ref(false)
const viewProduct = ref(false)
const router = useRouter()
const route = useRoute()
const itemDetail = ref()

const mint = () => {
    console.log(showMint.value);
    showMint.value = true;
};

const tokens = ref([])


const showMore = (itemcontract, itemIdentity) => {
  console.log(itemcontract)
  router.push(`/market/${itemcontract}/${itemIdentity}`)
}


const selectedCollection = computed(() => {
  return getStoreItem.value("selectedCollection")
});

const collectionItems = computed(() => {
  return getStoreItem.value("collectionItem")
});  

onBeforeMount(async () => {

  // await NFTStore.loadACollections(route?.params?.collectionId); 

  await NFTStore.loadMyMarketItem(route?.params?.collectionId); 


})

onMounted(async () => {
//   const profileContract = await NFTStore.loadMyProfileContract(await NFTStore.getConnectedAddress()); 
//   const nftMyProfile_contract = new ethers.Contract(profileContract, nftMyProfile_ABI, signer);

    nftFactory_contract.on("NFTDeployed", async () => {
      await NFTStore.loadMyCollections(await NFTStore.getConnectedAddress());
    })

    marketPlace_contract.on("MarketItemCreated", async () => {
      await NFTStore.loadMyMarketItem(route?.params?.collectionId); 
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

.card {
  --main-focus: #0D1042;
  --bg-color: #1F6E8C;
  --main-color: #fefefe;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.card-content-wrapper {
  transform: translateY(10px);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.7s;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--font-color);
}

.card-price {
  font-size: 20px;
  color: var(--font-color);
  font-weight: 700;
}

.card-price span {
  font-size: 16px;
  color: var(--font-color-sub);
  font-weight: 500;
}

.card-subtitle {
  letter-spacing: 2px;
  font-size: 17px;
  color: var(--main-focus);
  font-weight: 500;
}

.card-benefits {
  font-size: 15px;
  padding-left: 20px;
  color: var(--font-color);
}

.card-btn {
  cursor: pointer;
  width: 100px;
  padding: 5px;
  background: var(--main-focus);
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  transform: translateY(30px);
  color: var(--main-color);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.7px;
  opacity: 0;
  transition: all 0.7s;
}

.card:hover > .card-btn {
  opacity: 1;
  transform: translateY(17px);
}

.card-btn:hover {
  font-weight: 700;
  letter-spacing: 1px;
}

.card:hover > .card-content-wrapper {
  transform: translateY(5px);
}

</style>
 