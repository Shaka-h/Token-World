<template>
  <div
    class="bg-slate-100 dark:bg-darkmode-700 bg-opacity-70 rounded-lg p-1 md:p-5"
  >
    <div class="flex items-center" v-if="hasBackButton">
      <button
        class="btn btn-primary-soft dark:text-white"
        @click="gotoRoute('Home')"
      >
        <svg-icon
          name="phone"
          class="h-5 w-5"
          color="rgb(2 132 199)"
        ></svg-icon>
        Back
      </button>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4"
    >
      <template v-for="nav in cardItems" :key="nav.title">
        <router-link
          tag="div"
          :to="nav.to"
          class="group overflow-hidden rounded-lg shadow border border-cyan-50 bg-white dark:bg-darkmode-500 dark:text-slate-200 text-cyan-700 hover:text-white hover:bg-cyan-700 hover:scale-105 p-3 duration-300 transition cursor ease-in-out delay-50"
        >
          <div class="grid place-items-center">
            <div class="flex items-center justify-center">
              <svg-icon
                v-if="nav?.icon"
                :name="nav?.icon"
                class="h-10 w-10"
                color="rgb(2 132 199)"
              ></svg-icon>
            </div>
            <h1 class="font-medium font-sans text-base my-3">
              {{ nav?.title }}
            </h1>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
const props = defineProps({
  cardItems: {
    required: true,
    type: Array,
    default: () => [],
  },
  hasBackButton: {
    required: false,
    type: Boolean,
    default: false,
  },
});
</script>
