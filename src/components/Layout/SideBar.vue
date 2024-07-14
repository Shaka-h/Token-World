<template> 
    <div class="p-4 flex flex-row justify-between font-bold hidden sm:flex" style="background-color: #003C43;">
  
      <div @click="router.push('/')" class="cursor-pointer capitalize name text-center font-bold " style="color: #fff; " >
        Atsh Exchange
      </div>

      <!-- <div class="flex space-x-4 mt-4 items-center" v-if="myProfile?.length"> 
        <div v-if="myProfile[0]?.profileContract" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
          <img src="@/assets/images/profile.png"  alt="Profile picture">
        </div>

        <div v-if="myProfile[0]?.profileContract" class="rounded-md shadow intro-x ">
          <img :src="`${ipfsGateway}${myProfile[0]?.photoCID}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
        </div>

        <span class="mr-2">{{myProfile[0].name}}</span>
      </div> -->
  
      <div class=" flex">
        <template v-for="(navigationLink, index) of navigationLinks" :key="index">
          <template v-if="!navigationLink?.children?.length">
            <div class="flex items-center rounded-md " v-if="isActive(navigationLink?.link)" style="background-color: #c6deff">
              <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
              <div class="flex items-center p-2 text-primary2 font-bold">
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0369A1"></svg-icon>
                <span class="px-2" style="color: #0369A1; ">{{ navigationLink?.name }}</span>
              </div>
            </div>
            <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                 @click="goTo(navigationLink?.link)"
                 @mouseenter="hoveredLink = index"
                 @mouseleave="hoveredLink = null">
              <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="hoveredLink === index"></span>
              <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
              <div class="flex items-center p-2">
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0369A1" v-if="hoveredLink === index"></svg-icon>
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#fff" stroke="true" v-else></svg-icon>
                <span class="px-2" style="color: #E5E7EB; ">{{ navigationLink?.name }}</span>
              </div>
            </div>
          </template>
  
          <template v-else>
            <div class="px-3 intro-x mt-3 italic text-sm font-bold" style="color: #707070;">{{ navigationLink?.name }}</div>
            <div class="border-b mx-3"></div>
            <template v-for="(childNavigationLink, childIndex) of navigationLink?.children" :key="childIndex">
              <div class="flex items-center rounded-md" v-if="isActive(childNavigationLink?.link)" style="background-color: #c6deff">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
                <div class="flex items-center p-2 text-primary2">
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0369A1"></svg-icon>
                  <span class="px-2"  style="color: #0369A1">{{ childNavigationLink?.name }}</span>
                </div>
              </div>
              <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                   @click="goTo(childNavigationLink?.link)"
                   @mouseenter="childHoveredLink = `${index}_${childIndex}`"
                   @mouseleave="childHoveredLink = null">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="childHoveredLink === `${index}_${childIndex}`"></span>
                <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
                <div class="flex items-center p-2">
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0369A1" v-if="childHoveredLink === `${index}_${childIndex}`"></svg-icon>
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#999999" v-else></svg-icon>
                  <span class="px-2" style="color: #0369A1">{{ childNavigationLink?.name }}</span>
                </div>           
              </div>
            </template>
          </template>
        </template>

      </div>


     
  
    </div>
  </template>
  
<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
import {ipfsGateway} from "@/scripts/ContractConstants";
import { useStableCointore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const stableCoinStore = useStableCointore();
const route = useRoute()
const router = useRouter()
const hoveredLink = ref(null)
const childHoveredLink = ref(null)
const { getStoreItem } = storeToRefs(stableCoinStore)

const isActive = (link) => {
  return route.fullPath.includes(link)
}

const myProfile = computed(() => {
  return getStoreItem.value("myProfile")
})

const navigationLinks = ref([
  {
    name: "Transaction",
    link: "/transactions",
    icon: "news",
    permissions: [""],
  },
  // {
  //   name: "Deposits",
  //   link: "/deposits",
  //   icon: "news",
  //   permissions: [""],
  // },
  {
    name: "Profile",
    link: "/profile",
    icon: "notification",
    permissions: [""],
  },
  {
    name: "Logout",
    link: "./",
    icon: "data",
    permissions: [""],
  },
]);

const makeAPost = ref(false);

const closeDialog = () => {
  emits("closeDialog");
};

const postSomething = () => {
  makeAPost.value = true;
};


onMounted(async () => {
    await stableCoinStore.loadMyProfile(stableCoinStore.getConnectedAddress());
});
</script>

<style scoped lang="scss">
.inactive {
  color: #0d1042;
}
.inactive:hover {
  color: #257ae4;
}

.name {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 30px;
}

.sideBack {
  background: rgb(187, 132, 147);
  background: radial-gradient(
    circle,
    rgba(187, 132, 147, 1) 43%,
    rgba(219, 175, 160, 1) 69%,
    rgba(146, 144, 195, 1) 78%
  );
}



@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
