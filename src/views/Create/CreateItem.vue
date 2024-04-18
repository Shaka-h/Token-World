<template>
    <div class="flex flex-col space-y-2"> 
        <div><span class="mr-2">*</span>Image</div>
        <div class="border rounded-lg items-center justify-center flex ">
            <input v-model="fileString" class=" h-32 p-2 border m-2" />
            <div class="border w-full p-3 m-3">Item
                <div>Upload the file representation of your item</div>

            </div>
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
        <div><span class="mr-2">*</span>Supply</div>
        <div> 
            <input v-model="supply" class="rounded-lg p-2 border"/>
        </div>

    </div>
    <div class="mt-4"> 
        <div><span class="mr-2">*</span>Description</div>
        <div> 
            <input v-model="description" class="rounded-lg p-2 border"/>
        </div>
    </div>

    <div class="mt-4"> 
        <div><span class="mr-2">*</span>Attributes</div>
        <div class="ml-2 mt-2">Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</div>
        <div> 
            <div class="mt-2 ml-4">+ Add Attribute</div>
        </div>

    </div>

    <div class="flex justify-end mt-4">
        <div class="p-2 border bg-primary2 text-white hover:p-3 cursor-pointer rounded-lg" @click="MintItem()">Mint</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';
let {nftMyCollection_contract} = getSignerContract();

import addMetadata  from '@/scripts/IPFS'

const name = ref('');
const fileString = ref('');
const supply = ref(null);
const description = ref('');
const symbolCID = ref('')


const uploadItem = async () => {
    try {
        const file = await addMetadata(fileString.value);
        console.log('Item uploaded to IPFS with CID:', file.toString());
        symbolCID.value = file.toString(); 
    } catch (error) {
        console.error('Error uploading Item to IPFS:', error);
        throw error; 
    }
};

const getItemCID = async () => {
    try {
        await uploadItem();

        const itemCID = await addMetadata(
            name.value,
            symbolCID.value,
            logo.value,
            description.value,
        );

        return itemCID
        console.log('Item created successfully with metadata. CID:', itemCID);
    } catch (error) {
        console.error('Error creating collection:', error);
    }
};


const MintItem = async () => {
    try {
        let tokenURI = await getItemCID();

        await nftMyCollection_contract.createToken(
            tokenURI

        ).then(result => {
            console.log(result)
        }).catch(err => {
            console.error(err)
        }) 
    } catch (error) {
        console.error('Error creating collection:', error);
    }
}
</script>