<template>

    <div class="px-4 pb-4">
        <div class="flex justify-end mt-4 space-x-3">
            <div class="bg-primary py-1 px-2 mr-2 rounded-lg cursor-pointer"> 
                back
            </div>
        </div>
    
        <div> 
            <div class="mt-4"> 
                <div> 
                    <simple-table :columns="columns" :table-data="tableData" :has-search="false">
                        <template v-slot:actions="{}">
                           
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
import { useRouter } from 'vue-router';

const router = useRouter()

const qty = ref(1);

const columns = ref({
    "itemName": "Item Name",
    "quantity": "Quantity",
    "price": "Price",
    "action": "Action",
    "from/to": "From/To",
})
const tableData = ref([
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Sold",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Bought",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Sold",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Bought",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Bought",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Sold",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
    {
        "itemName": "Sady luki tshirts",
        "unitPrice": "12000 Atsh",
        "quantity": 2,
        "price": 120000,
        "action": "Sold",
        "from/to": "0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF",
    },
])

</script>
 