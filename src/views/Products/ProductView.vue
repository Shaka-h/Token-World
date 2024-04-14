<template>
    <NavBar />

    <div class="px-4 pb-4">
        <div class="flex justify-end mt-4 space-x-3">
            <div class="bg-primary py-1 px-2 rounded-lg cursor-pointer">cart</div>
            <div class="bg-primary py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                back
            </div>
        </div>
    
        <div> 
            <div class="flex" style="height: 60vh"> 
    
    
                <div class="flex items-center justify-center border m-2 rounded-lg" style="width: 40%"> 
                    Image
                </div>

                <div class="flex flex-col" style="width: 60%"> 
                    <div class="ml-2 mt-2 font-bold text-2xl">Product Name</div>

                    <div class="flex h-full">
                     <div class="flex flex-col p-2 border mx-2 mt-3 rounded-lg"> 
                         <div>Owner</div>
                         <div>
                             <span>Collection:</span>
                             <span class="ml-4">SHAKA</span>
                         </div>
                         <div class="flex space-x-4"> 
                             <div>Stephen Michael</div>
                             <div>0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF</div>
                         </div>
                         <div class="mt-2">Description</div>
                         <div> 
                             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                         </div>
         
                         <div class="mt-4">Token Id: <span class="ml-2">123</span></div>
                         <div>Last Modified: <span class="ml-2">9hrs ago</span></div>
                         <div>Date Created: <span class="ml-2">04/05/2023</span></div>
                         <div>Number of Offerings:<span class="ml-2">20</span></div>
                     </div>
         
         
                     <div class="flex flex-col  p-2 border mx-2 mt-3 rounded-lg"> 
                         Price Breakdown
                         <div class="mt-4">Price: 12000 Atsh </div>
                         <div class="mt-2">Tax: 100 Atsh </div>
                         <div class="mt-2">Total: 12100 Atsh </div>
                         <div class="space-x-2 mt-4"> 
                             <label>Quantity</label>
                             <input type="number" class="border" :value="qty" @input="qty=$event.target.value"/>
                         </div>
                         <div class="mt-2">Total: 242000 Atsh <span>for <span>{{qty}}</span> unity</span></div>
                         <div> 
                             <input />
                         </div>
                         <div class="flex space-x-4">
                             <div class="border py-1 px-4 bg-primary2 rounded-lg cursor-pointer">Buy</div>
                             <div class="border py-1 px-4 bg-indigo rounded-lg cursor-pointer">Add To Cart</div>
                         </div>
                     </div>
                    </div>
                </div>
            </div>
    
            <div class="mt-4"> 
                <div class="font-bold text-xl">Offerings</div>
                <div> 
                    <simple-table :columns="columns" :table-data="tableData" :has-search="false">
                        <template v-slot:actions="{}">
                          <div class="">
                            <div class="flex items-center">
                                <span class="flex items-center mr-3 text-primary2 hover:font-bold cursor-pointer" >
                                <svg-icon name="view" height="h-5" width="w-5" class="mr-1" color="#257ae4"></svg-icon>
                                  Accept 
                              </span>
                            </div>
                          </div>
                        </template>
                      </simple-table>
                </div>
            </div>
        </div>
    </div>
</template>
 

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import SimpleTable from "@/components/shared/SimpleTable.vue";

const qty = ref(1);

const columns = ref({
    "unitPrice": "Unit Price",
    "quantity": "Quantity",
    "floorDifference": "Floor Difference",
    "expiration": "Expiration",
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

</script>
 