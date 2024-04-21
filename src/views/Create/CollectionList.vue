<template>
    <div class="flex flex-col">
      <div class="text-2xl mb-4 border-b-4">Choose Collection to mint item</div>
        <div @click="router.push(`/cart/${item.NftContract}`)" v-for="(item, index) of tableData" :key="index" class="border hover:bg-gray hover:p-3 p-2 my-2 cursor-pointer" style="">   
          <div @click="viewCollection(item)" class="">
            <div class="flex items-center"> 
              <img :src="item.logo" alt="icon description" class="p-2 h-32 w-32">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{item.symbol}}</h5>
            </div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name: {{item.name}}</h5>

            <h5 class="mb-2">{{item.description}}</h5>
            
            
          </div>
            
        </div>
      </div>
</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import { useRouter } from 'vue-router';
import {getSignerContract} from '../../scripts/ContractUtils';

let {nftFactory_contract} = getSignerContract();

const router = useRouter();

const collections = ref([])

const tableData = computed(() => {
  return collections.value.map(collection => ({
    ...collection,
    logo: `http://127.0.0.1:8080/ipfs/${collection.logo}`

  }));
});

onMounted( async () => {
  const myCollections = await nftFactory_contract.getAllDeployedNFTCollections()
  collections.value = myCollections

  console.log(myCollections);
})
</script>
