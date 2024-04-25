<template>
           <div class="w-1/2 p-10" style="background-color: rgb(245, 237, 237);">
            <div class="flex justify-end mt-4">
                <div class="p-2 border bg-danger text-white hover:p-3 cursor-pointer rounded-lg" @click="closeDialog()">Cancel</div>
            </div>
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
                <select name="action" class="rounded-lg p-2 border">
                    <option value="market">Deploy to a normal market</option>
                    <option value="auction">Deploy to aution item</option>
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
</template>

<script setup>
import { ref, onMounted} from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';
import addMetadata  from '@/scripts/IPFS'
import addMetadataFile  from '@/scripts/IPFSJSON'
import {nftMyCollection_ABI, marketPlace } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';
import { useRoute } from 'vue-router';

const router = useRoute()
const dialog = ref(false)
const nftMyCollection_contract = ref()
const emits = defineEmits(['cancel'])

let {signer, marketPlace_contract} = getSignerContract();

const name = ref('');
const fileString = ref(null);
const supply = ref(null);
const description = ref('');
const symbolCID = ref('')
const price = ref()

const closeDialog = () => {
  emits('cancel')
}

const setFilePath = ($event) => {
    fileString.value = $event.target.files[0]
}

const uploadItem = async () => {
    try {
        const file = await addMetadata(fileString.value);
        console.log('logo uploaded to IPFS with CID:', file.toString());
        symbolCID.value = file.toString(); 
    } catch (error) {
        console.error('Error uploading Item to IPFS:', error);
        throw error; 
    }
};

const getItemCID = async () => {
    try {
        await uploadItem();

        const itemCID = await addMetadataFile(
            {
                "name": name.value,
                "symbolCID":symbolCID.value,
                "supply": supply.value,
                "description": description.value,
            }
            
        );
        console.log('Item created successfully with metadata. CID:', itemCID);

        return itemCID
    } catch (error) {
        console.error('Error creating collection:', error);
    }
};


const MintItem = async () => {
    try {
        let tokenURI = await getItemCID();
        console.log(tokenURI);

        const tokenURIReturned = await nftMyCollection_contract.value.createToken(
            tokenURI
        )
        console.log(tokenURIReturned);

        let receipt = await tokenURIReturned.wait()

        console.log(receipt);
        console.log(receipt?.events[3].args.tokenURI);
        console.log(receipt?.events[3].args.itemId);
        
        const tokenIdBigNumber = receipt?.events[3].args.itemId;

        // Convert BigNumber to JavaScript number
        const tokenId = tokenIdBigNumber.toNumber();

        console.log(tokenId);

        if (tokenId) {
            const mintItem = await marketPlace_contract.createMarketItem(
                router?.params?.nftAddress,
                tokenId,
                price.value
            )

            console.log(mintItem);
            let mintedItemReturned = await mintItem.wait()
            console.log(mintedItemReturned?.events[1].args.itemId);

            const itemIdBigNumber = mintedItemReturned?.events[1].args.itemId
            const itemId = itemIdBigNumber.toNumber()

            if (itemId) {
                window.location.reload();
            } else {
                console.error('Error creating Item on market');
            }

        } else {
            console.error('Error creating token for item');
        }

    } catch (error) {
        console.error('Error creating collection:', error);
    }
}

onMounted(() => {
    nftMyCollection_contract.value = new ethers.Contract(router?.params?.nftAddress, nftMyCollection_ABI, signer);    
    console.log(router?.params?.nftAddress)

})

</script>