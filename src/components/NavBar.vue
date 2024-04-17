<template>
    <div class="flex flex-row justify-between pt-0 px-4 items-center bg-primary">
        <div class="h-16 flex items-center w-16 cursor-pointer" @click="router.push('/')"> 
            <img src="../../public/saturn.png"/>
        </div>
        <div class="flex space-x-4"> 
            <div class="text-white hover:border-b cursor-pointer">Connect Wallet</div>
            <div class="text-white hover:border-b cursor-pointer">Get Atsh</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>