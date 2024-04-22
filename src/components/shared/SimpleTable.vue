<template>
  <div class="intro-y overflow-auto lg:overflow-visible sm:mt-0">
    <div class="flex flex-wrap justify-between" :class="{'mb-2': !tableTitle?.length}">
      <span class="mr-auto text-base uppercase font-semibold" v-if="tableTitle">{{ tableTitle }}</span>
    </div>
    
      <div v-if="hasSearch" class="search">
          <input
            type="text"
            class="search__input"
            :placeholder=searchName
            @input="$emit('search:change', $event)" v-model="search"
          />
          <button class="search__button">
            <svg-icon :name="'search'" class="icon" color="#999999"></svg-icon>
          </button>
      </div>
    <table class="table table-report">
      <thead>
      <tr>
        <th class="whitespace-nowrap">No</th>
        <th class="whitespace-nowrap" v-for="(column, index) in columns" :key="index">
          {{ column }}
        </th>
        <th class="whitespace-nowrap" v-if="hasActions">{{ actions }}</th>
      </tr>
      </thead>
      <tbody v-if="previewData?.length === 0 && isLoading">
      <tr>
        <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="skeleton">
          <div class="h-4"></div>
        </td>
      </tr>
      </tbody>
      <tbody v-if="!previewData?.length && !isLoading">
      <tr>
        <td :colspan="Math.ceil( Object.keys(columns)?.length + 2)" class="text-center p-2">
          <span class="font-semibold text-base">{{ "NO ITEMS AVAILABLE" }}</span>
        </td>
      </tr>
      </tbody>
      <tbody v-if="previewData?.length">
        <tr class="intro-x" v-for="(data, index) of previewData" :key="index">
          <td v-if="!currentPageObject?.number">{{ index + 1 }}</td>
          <td v-else>{{ currentPageObject?.number === 1 ? index + 1 : index + 1 + (20 * (currentPageObject?.number - 1)) }}</td>
          <td class="text-start text-wrap" v-for="key of Object.keys(columns)" :key="key">
            <slot :name="key" :itemData="data" :index="index">
          {{ data[key] ? data[key] : '' }}
            </slot>
          </td>
          <td v-if="hasActions">
            <slot name="actions" :itemData="data" :index="index"></slot>
          </td>
        </tr>
      </tbody>
    </table>
   <div class="text-center flex justify-center">
     <div class="rounded-md flex items-center" >
      <div class="flex flex-col items-center">
        <!-- Help text -->
        
        <div class="inline-flex mt-0 xs:mt-0 items-center space-x-2">
          <!-- Buttons -->
          <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
              </svg>
              Prev
          </button>
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">10</span>  <span class="font-semibold text-gray-900 dark:text-white"></span> Entries
          </span>
          <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
              <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </div>
     </div>
   </div>
  </div>
</template>

<script>

import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useDigitalClubsStore } from "@/store/index.js"
import { storeToRefs } from "pinia";

export default {
  name: "SimpleTable",
  props: {
    columns: {
      type: []
    },
    tableData: {
      type: []
    },
    hasActions: {
      type: Boolean,
      default: true
    },
    tableTitle: {
      default: "",
      type: String,
      required: false
    },
    searchField: {
      default: "",
      type: String,
      required: false
    },
    hasSearch: {
      default: false,
      type: Boolean,
      required: false
    },
    searchName: {
      default: "Search",
      type: String,
      required: false
    },
    filtering: {
      default: () => [],
      type: Array,
      required: false
    },
    buttons: {
      default: () => [],
      type: Array,
      required: false
    },
    selectedIndex: {
      required: false
    }
  },
  emits: [
    "search:change",
    "clickSearch:append",
    "clickSearch:clear",
    "button:click",
    "filter:update",
    "clickFilter:clear",
    "page:change",
  ],
  components: { SvgIcon },
  data() {
    return {
      search: "",
      page: 1,
      }
  },
  setup(){
    const store = useDigitalClubsStore();
    const { getStoreItem } = storeToRefs(store);

    return{
      getStoreItem
    }
  },
  computed: {
    isLoading() {
      // return this.$store.getters.getLoadingState;
      return false
    },
    currentPageObject() {
      return this.getStoreItem('pagination')
      // return 1
    },
    previewData () {
      if (this.search == "") {
        return this.tableData
      } else {
        let keys = Object.keys(this.columns)
        let results = this.tableData?.filter(item =>
            // Search Functionality
            keys.some(key => item[key]?.toLowerCase()?.includes(this.search?.toLowerCase()))
        )
        return results;
      }
    }
  },
  methods: {
    evaluateExpression(value)  {
      return value?.includes(this.search?.toLowerCase());
    },
    updateCurrentPage(page){
      this.$emit("page:change", page)
    }
  }
};
</script>

<style scoped>

.table-report:not(.table-report--bordered):not(.table-report--tabulator) {
  border-spacing: 0 10px;
  border-collapse: separate;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) th{
  border-bottom-width: 0px;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td{
  border-bottom-width: 0px;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.dark .table-report:not(.table-report--bordered):not(.table-report--tabulator) td{
  --tw-bg-opacity: 1;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td {
  box-shadow: 20px 3px 20px #0000000b;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td:first-child{
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td:last-child{
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td.table-report__action{
  position: relative;
  padding-top: 0px;
  padding-bottom: 0px;
}
.table-report:not(.table-report--bordered):not(.table-report--tabulator) td.table-report__action::before{
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  margin-bottom: auto;
  display: block;
  height: 2rem;
  width: 1px;
  content: var(--tw-content);
  --tw-bg-opacity: 1;
}
.dark .table-report:not(.table-report--bordered):not(.table-report--tabulator) td.table-report__action::before{
  content: var(--tw-content);
  --tw-bg-opacity: 1;
}
.table-report img {
  box-shadow: 0px 0px 0px 2px #fff, 1px 1px 5px rgba(0, 0, 0, 0.32);
}
.table-report.table-report--tabulator
.tabulator-header
.tabulator-headers
.tabulator-col:nth-child(3) .tabulator-col-content .tabulator-col-title, .table-report.table-report--tabulator
.tabulator-header
.tabulator-headers
.tabulator-col:nth-child(4) .tabulator-col-content .tabulator-col-title, .table-report.table-report--tabulator
.tabulator-header
.tabulator-headers
.tabulator-col:nth-child(5) .tabulator-col-content .tabulator-col-title, .table-report.table-report--tabulator
.tabulator-header
.tabulator-headers
.tabulator-col:nth-child(6) .tabulator-col-content .tabulator-col-title{
  text-align: center;
}
.dark .table-report img {
  box-shadow: 0px 0px 0px 2px #3f4865, 1px 1px 5px rgba(0, 0, 0, 0.32);
}

.textInputWrapper {
  position: relative;
  margin: 12px 5px;
  --accent-color: #257AE4FF;
}

.textInputWrapper:before {
  transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
}

.textInputWrapper:before,
.textInputWrapper:after {
  content: "";
  left: 0;
  right: 0;
  position: absolute;
  pointer-events: none;
  bottom: -1px;
  z-index: 4;
  width: 100%;
}

.textInputWrapper:focus-within:before {
  border-bottom: 1px solid var(--accent-color);
}

.textInputWrapper:before {
  transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-bottom: 1px solid #A4A4A46B;
}

.textInputWrapper:focus-within:before {
  border-bottom: 1px solid var(--accent-color);
  transform: scaleX(1);
}

.textInputWrapper:focus-within:after {
  border-bottom: 2px solid var(--accent-color);
  transform: scaleX(1);
}

.textInputWrapper:after {
  content: "";
  transform: scaleX(0);
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  will-change: transform;
  border-bottom: 2px solid var(--accent-color);
  border-bottom-color: var(--accent-color);
}

.textInput::placeholder {
  transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  opacity: 1;
  user-select: none;
}

.textInputWrapper .textInput {
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 5px rgb(35 35 35 / 0%);
  max-height: 36px;
  background-color: #ffffff;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 200ms;
  transition-property: background-color;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  width: 100%;
  border-left: none;
  border-bottom: none;
  border-right: none;
}

.textInputWrapper .textInput:focus,
.textInputWrapper .textInput:active {
  outline: none;
}

.textInputWrapper:focus-within .textInput,
.textInputWrapper .textInput:focus,
.textInputWrapper .textInput:active {
  background-color: #ffffff;
}

.textInputWrapper:focus-within .textInput::placeholder {
  opacity: 0;
}

</style>
