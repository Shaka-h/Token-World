<template>
    <div class="flex justify-between">
        <div class="font-bold text-3xl"> 
            Create your NFTs
        </div>
    </div>
    <div class="flex h-full flex justify-evenly"> 
        <div class="flex flex-col" style="width: 40%">         
            <template v-for="(component, index) of components" :key="index" >
                     <div v-if="component.id === activeComponent" class="cursor-pointer border mt-8 p-4 text-white rounded-lg bg-primary2">
                        <div>{{component.detail}}</div>
                        <div> 
                            <div>{{component.detail2}}</div>
                            <div>
                                {{component.detail3}}
                            </div>
                            <div>
                                {{component.detail4}}
                            </div>
                            <div>
                                {{component.detail5}}
                            </div>
                        </div>
                    </div>
    
                    <div v-else class="cursor-pointer border p-4 rounded-lg mt-8" @click="activeComponent=component.id">
                        <div>{{component.detail}}</div>
                        <div> 
                            <div>{{component.detail2}}</div>
                            <div>
                                {{component.detail3}}
                            </div>
                            <div>
                                {{component.detail4}}
                            </div>
                            <div>
                                {{component.detail5}}
                            </div>
                        </div>
                    </div>
             </template>
        </div>
        <div class="mt-8" style="width: 40%"> 
            
            <div v-if="activeComponent==='collection'"> 
                <CreateCollection />
            </div>
            <!-- <div v-if="activeComponent==='item'"> 
                <CreateItem />
            </div> -->
            <div v-if="activeComponent==='item'"> 
                <CollectionList />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateCollection from './CreateCollection.vue';
import CollectionList from './CollectionList.vue';
import NavBar from '@/components/NavBar.vue';
 

const activeComponent = ref('collection');
const components = ref([
    {
        name: "createCollection",
        id :"collection",
        detail: "Create a collection",
        detail2: "If you are new to the token world create your nft collection to mint your items",
        detail3 : "An NFT collection refers to a group or series of NFTs that share common characteristics, such as belonging to the same artist, representing a specific theme, or being part of a particular project.",
        detail4: "Collections can be created by individual artists, companies, or communities, and they often have a unique name, brand, or theme associated with them.",
        detail5: "Examples of NFT collections include Diamond Songs, Toyota Cars, and Mac electronics."
    },
    {
        name: "createItem",
        id: "item",
        detail: "Mint an item in your collection",
        detail2: "Mint your items in your NFT collection",
        detail3 : "NFT items, on the other hand, refer to the individual tokens within an NFT collection. Each NFT item represents a unique digital asset that is distinguishable from other tokens within the same collection.",
        detail4: "These items can be digital artworks, collectibles, virtual real estate, in-game assets, and more, depending on the context of the NFT collection.",
        detail5: "Each NFT item typically has its own unique metadata, including properties such as title, description, image, and any other relevant attributes that differentiate it from other items in the collection."
    
    }
])

</script>