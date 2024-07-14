<template>
    <v-dialog v-model="dialog" :persistent="true" width="950">
      <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
        <div
          class="flex justify-between items-center p-2 text-gray-500"
        >
          <span class="font-bold px-2">
            <span v-if="title">{{ title }}</span>
          </span>
          <button @click="$emit('closeDialog', true)">
            <svg-icon
              name="close"
              height="h-6"
              width="w-6"
              color="#a91926"
              :override_color="true"
              :stroke="false"
            ></svg-icon>
          </button>
        </div>
  
        <div class="p-5 ">
         {{ props?.ItemDetails }}
        </div>
         
       </div>
    </v-dialog>
  </template>
  
  
  <script setup>
  import { onMounted, ref, watch, computed } from 'vue';
  import {getSignerContract} from '@/scripts/ContractUtils';
  import {patchFormFields} from "@/interfaces/global.interface";
  import { useNFTstore } from "@/store/index.js";
  import {storeToRefs} from "pinia";
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  
  const stableCoinStore = useNFTstore();
  const props = defineProps(["openDialog", "ItemDetails", "profileContract"]);
  const emits = defineEmits(["closeDialog"]);
  const { getStoreItem } = storeToRefs(stableCoinStore)
  
  const dialog = ref(false);
  

  const CreateProfile = async (formValues) => {
    if (!props?.profileContract) {
      try {
        await stableCoinStore.createProfile(formValues);
        emits('closeDialog')
        console.log("deno");
        await stableCoinStore.loadMyProfile(stableCoinStore.getConnectedAddress());
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    } else {
      try {
        await stableCoinStore.editProfile({ ...formValues, profileContract: props?.profileContract});
        emits('closeDialog')
        console.log("doen", stableCoinStore.getConnectedAddress());
        await stableCoinStore.loadMyProfile(stableCoinStore.getConnectedAddress());
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    }
   }
  
  watch(() => props.openDialog, (value) => {
    dialog.value = value
    if(props?.profileData){
      formFields.value = patchFormFields(formFields.value, {...props?.profileData[0], id: 1})
    }
  })
  

  </script>