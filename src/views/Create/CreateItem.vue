<template>
  <v-dialog v-model="dialog">
    <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
      <div
        class="flex justify-between items-center p-2 text-gray-500"
      >
        <span class="font-bold px-2">
          <span v-if="title">{{ title }}</span>
        </span>
        <button @click="$emit('closeDialog', true)">
          <svg-icon
            name="close"
            height="h-6"
            width="w-6"
            color="#a91926"
            :override_color="true"
            :stroke="false"
          ></svg-icon>
        </button>
      </div>

      <div class="p-5 ">{{ router?.params?.collectionId }}
          <div class="flex flex-col space-y-2"> 
              <div><span class="mr-2">*</span>Image</div>
              <div class="border rounded-lg items-center justify-center flex ">
                  
                  <div class="border w-full p-3 m-3">Item
                      <div>Upload the file representation of your item</div>
      
                  </div>
                  <input type="file" @change="setFilePath($event)" class="" />
              </div>
          </div>
          <div class="mt-4">
              <div> 
                  <div><span class="mr-2">*</span>Name</div>
                  <div> 
                      <input v-model="name" class="rounded-lg p-2 border"/>
                  </div>
      
              </div>
          </div>
          
          <div class="mt-4"> 
              <div><span class="mr-2">*</span>Description</div>
              <div> 
                  <input v-model="description" class="rounded-lg p-2 border"/>
              </div>
          </div>

          <div class="mt-4"> 
              <div><span class="mr-2">*</span>Choose an action</div>
              <select v-model="selectedOption" @change="console.log('Selected option:', selectedOption);                ">
                  <option v-for="(option, index) of options" :key="index" :value="option.value">{{ option.label }}</option>
              </select>
          </div>

          <div class="mt-4"> 
              <div><span class="mr-2">*</span>Price</div>
              <div> 
                  <input v-model="price" type="number" class="rounded-lg p-2 border"/>
              </div>
          </div>
      
          <div class="flex justify-end mt-4">
              <div class="p-2 border bg-primary2 text-white hover:p-3 cursor-pointer rounded-lg" @click="MintItem()">Mint</div>
          </div>
      
      </div>
        
    </div>
  </v-dialog>
</template>
  
  
<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";  
import { useRoute } from 'vue-router';
import SvgIcon from "@/components/shared/SvgIcon.vue";

const router = useRoute()
const nftMyCollection_contract = ref()

const NFTStore = useNFTstore();
const props = defineProps(["openDialog", "profileData", "profileContract"]);
const emits = defineEmits(["closeDialog"]);
const { getStoreItem } = storeToRefs(NFTStore)
  

const selectedOption = ref(null)
const options = ref([ 
    { value: 'market', label: 'Deploy to a normal market' },
    { value: 'auction', label: 'Deploy to aution item' },
])
const name = ref('');
const fileString = ref(null);
const description = ref('');
const price = ref()

const closeDialog = () => {
  emits('closeDialog')
}

const setFilePath = ($event) => {
    fileString.value = $event.target.files[0]
}
const dialog = ref(false)

const MintItem = async () => {
    if(selectedOption.value === "market"){
        try {
        await NFTStore.MarketMintItem({
            "name": name.value,
            "option": selectedOption.value,
            "description": description.value,
            "price": price.value,
            "image": fileString.value,
            "contractAddress": router?.params?.collectionId
        });

        emits('closeDialog')
        // console.log("deno");
        // await NFTStore.loadMyProfile(NFTStore.getConnectedAddress());

      } catch (error) {
        console.error('Error creating profile:', error);
      }
    } else if(selectedOption.value === "auction"){
        try {
        await NFTStore.AuctionMintItem({
            "name": name.value,
            "option": selectedOption.value,
            "description": description.value,
            "price": price.value,
            "image": fileString.value,
            "contractAddress": router?.params?.collectionId
        });
        emits('closeDialog')
        // console.log("doen", NFTStore.getConnectedAddress());
        // await NFTStore.loadMyProfile(NFTStore.getConnectedAddress());
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    }
    else {
        console.error('choose an action of deployment')
    }
}

watch(() => props.openDialog, (value) => {
  dialog.value = value
  console.log(value,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
})


  const myProfile = computed(() => {
    return getStoreItem.value("myProfile")
  })
  
  
  
  onMounted(async () => {
    //   await NFTStore.loadMyProfile(NFTStore.getConnectedAddress()); 
  });
  
  </script>
