<template>
    <div class="flex w-full p-2 justify-between mt-2">
        <div class="flex space-x-8 w-full"> 
            
            <div>0x435C67b768aEDF84c9E6B00a4E8084dD7f1bc5FF</div>
        </div>
        
        <div class="flex space-x-2">
            <div @click="router.push('/create')" class="cursor-pointer">Create </div>
            <div>icon</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>