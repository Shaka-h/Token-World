<template>
    <NavBar />
    
    <Nav2 />
    <div class="flex w-full p-2 justify-end mt-2">
        
        <div class="flex">
            <search-bar />
        </div>
    </div>
    <div class="mt-3 w-full">
      <div class="bg-white">ITEMS<span class="text-blue cursor-pointer ml-4">view all</span></div>
      <simple-table :columns="columns" :table-data="tokensData" :has-search="false">
        <template v-slot:actions="{itemData}">
          <div class="">
            <div class="flex items-center">
                <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer" @click="viewProduct(itemData)">
                <svg-icon name="view" height="h-5" width="w-5" class="mr-1" color="#257ae4"></svg-icon>
                  view 
              </span>
            </div>
          </div>
        </template>
        <template v-slot:image="{itemData}">
            <div class="">
              <div class="flex items-center">
                <img :src="'http://127.0.0.1:8080/ipfs/' + itemData.symbolCID"  alt="icon description" class="p-2 h-24">
            </div>
            </div>
          </template>
    </simple-table>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Nav2 from '@/components/Nav2.vue'
import SearchBar from '@/components/SearchBar.vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const columns = ref({
  "itemName": 'item Name',
  "owner": 'owner',
  "price": 'price',
})
const router = useRouter();
const viewProduct = (item) => {
  console.log(item.tokenId)
  router.push(`/item/${item.tokenId}`)
}

const tokens = ref([])

const tokensData = ref([])

const fetchData = async () => {
    const responseData = []; // Array to store response data

    for (const item of tokens.value) {
        try {
            const response = await fetch(`http://127.0.0.1:8080/ipfs/${item}`);
            const data = await response.json();
            responseData.push(data); // Push data to responseData array
            console.log('Data for', item, ':', data);
            // Handle data as needed
        } catch (error) {
            console.error('Error fetching data from', item, ':', error);
            // Handle error
        }
    }
    return responseData; // Return the array of response data
};


onMounted(async () => {
  await fetchData().then((responseData) => {
        console.log('All response data:', responseData);
        tokensData.value = responseData
    });
    
})
</script>