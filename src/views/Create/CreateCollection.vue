<template>
    <div> 
        <div>
            <div class="font-bold text-1xl"><span class="mr-2">*</span>Logo Image</div>
            <div class="flex flex-col space-y-2"> 
                <div class="border rounded-lg items-center justify-center flex ">
                    
                     <div class="border w-full p-3 m-3">image
                        <div>Upload the logo image of your collection</div>
                    </div>
                    <input type="file" @change="setFilePath($event)" class="" />
                </div>
            </div>
        </div>
        <div class="mt-3"> 
            <div> 
                <div class="font-bold text-1xl"><span class="mr-2">*</span>Contract Name</div>
                <div> 
                    <input v-model="name" class="border rounded-lg p-2"/>
                </div>
            </div>
            <div> 
                <div class="font-bold text-1xl mt-2 "><span class="mr-2">*</span>Token Symbol</div>
                <div> 
                    <input v-model="symbol" class="border rounded-lg p-2"/>
                </div>
            </div>
            <div> 
                <div class="font-bold text-1xl mt-2 "><span class="mr-2">*</span>Description</div>
                <div> 
                    <input v-model="description" class="border rounded-lg p-2"/>
                </div>
            </div>
        </div>
        <div class="flex mt-4">
            <div @click="CreateCollection()" class="p-2 border bg-primary2 text-white cursor-pointer hover:p-3 rounded-lg">Create</div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';
import addMetadata  from '@/scripts/IPFS'
import { useNFTstore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const NFTStore = useNFTstore();
const props = defineProps(['openDialog'])
const emits = defineEmits(['closeDialog'])
const { getStoreItem } = storeToRefs(NFTStore)

let {nftFactory_contract} = getSignerContract();

const name = ref('');
const logo = ref(null);
const symbol = ref(null);
const description = ref('');
const logoCID = ref(null)

const setFilePath = ($event) => {
    console.log($event.target.files[0], "kkkkkk");
    logoCID.value = $event.target.files[0]
}

const CreateCollection = async () => {
    try {
        await NFTStore.createCollection({
            name: name.value,
            symbol: symbol.value,
            description: description.value,
            logoCID: logoCID.value
        });
        console.log("deno", logoCID.value);
        
    } catch (error) {
        console.error('Error creating profile:', error);
    }
}



</script>