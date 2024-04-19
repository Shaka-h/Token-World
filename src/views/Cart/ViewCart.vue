<template>
    <NavBar />
    <div class="m-4 "> 
        <div class="flex justify-between w-full"> 
            <div class="flex flex-row mt-4">
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
        <div v-if="activeTab==='mycart'" class="flex justify-end mt-4 space-x-3">
            <div class="bg-primary text-white py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                Buy All
            </div>
        </div>
        <div v-if="activeTab==='mycart'" class="w-full flex mt-4"> 
            <div class="w-full m-2"> 
                <table class="table table-report">
                    <thead>
                    <tr>
                      <th class="whitespace-nowrap">No</th>
                      
                      <th class="whitespace-nowrap">Item Name</th>
                      <th class="whitespace-nowrap">Price</th>
                      <th class="whitespace-nowrap">Quantity</th>
                      <th class="whitespace-nowrap">Offer</th>

                      <th class="whitespace-nowrap"> </th>

                      <th class="whitespace-nowrap"> </th>
                    </tr>
                    </thead>
                    
                    <tbody >
                      <tr class="intro-x" v-for="(data, index) of tableData" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{data.itemName}}</td>
                        <td>{{data.price}}</td>
                        <td>
                            <span @click="data.quantity=data.quantity-1" class="font-bold cursor-pointer">-</span>
                            <input :value="data.quantity" type="" class="border w-12 ml-2 h-6" @input="qty=$event.target.value"/>
                            <span @click="data.quantity=data.quantity+1" class="font-bold ml-2 cursor-pointer">+</span>
                        </td>
                        <td><input class="border w-32"/></td>
                        <td>
                            <button class="bg-danger px-2 py-1 rounded-lg">Remove</button>
                        </td>
                        <td>
                            <button class="bg-primary2 px-2 py-1 rounded-lg">Buy</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </div>
            
        </div>

        <div v-if="activeTab==='transactions'" class="mt-4"> 
            <Transactions />
        </div>
        <div v-if="activeTab==='nfts'" class="mt-4"> 
            <NftsProfile />
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import NftsProfile from '@/views/Cart/NftsProfile.vue'
import { ref } from 'vue';
import Transactions from '@/views/Cart/Transactions.vue';

const activeTab = ref('nfts')
const activity = ref([
    {
        name: "My NFTs",
        id: 'nfts'
    },
    {
        name: "My Cart",
        id: 'mycart'
    },
    {
        name: "My Transactions",
        id: 'transactions'
    }
])

const tableData = ref([
    {
        "itemName": "Unit Price",
        "price": 210000,
        "quantity": 2
    },
    {
        "itemName": "Unit Price",
        "price": 120000,
        "quantity": 2

    },
    {
        "itemName": "Unit Price",
        "price": 10000,
        "quantity": 5
    }
])
</script>