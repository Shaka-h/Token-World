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
import router from '@/router';


let {nftFactory_contract} = getSignerContract();

const name = ref('');
const logo = ref('');
const symbol = ref(null);
const description = ref('');
const logoCID = ref(null)

const setFilePath = ($event) => {
    logo.value = $event.target.files[0]
}

const uploadLogo = async () => {
    try {
        const logoString = await addMetadata(logo.value);
        console.log('Logo uploaded to IPFS with CID:', logoString.toString());
        logoCID.value = logoString.toString(); 
    } catch (error) {
        console.error('Error uploading Item to IPFS:', error);
        throw error; 
    }
};

const CreateCollection = async () => {

    console.log(logo.value);
    try {
        await uploadLogo();

        const deployedContractAddress = await nftFactory_contract.deployNFTContract(
            name.value,
            symbol.value,
            logoCID.value,
            description.value,
        );
        console.log(deployedContractAddress); // Log the deployed contract address

        // wait() function allows to wait for transaction to be completed
        let receipt = await deployedContractAddress.wait()  

        console.log(receipt);

        // not decodeFunctionData
        // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
        // encodedData is found in receipt

        // Ensure that deployedContractAddress is not null or undefined before routing
        if (receipt?.events[0]?.args?.nftContract) {
            await router.push(`/cart/${receipt?.events[0]?.args?.nftContract}`);
        } else {
            console.error('Error creating collection: Deployed contract address not returned.');
        }

    } catch (error) {
        console.error('Error creating collection:', error);
    }
}



</script>