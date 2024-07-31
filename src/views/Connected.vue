<template>
    <main-layout :navigation-links="navigationLinks" :panel-name="panelName">
        
    </main-layout>
</template>

<script setup>
import MainLayout from '@/components/Layout/MainLayout.vue';

import {ref} from "vue";

const panelName = ref('sponsorPanelName')
const navigationLinks = ref([
{
    name: "dashboard",
    link: "/sponsor/dashboard",
    icon: 'dashboard',
    permissions: ['']
},
// {
//   name: "clubs",
//   link: "/sponsor/sponsored-clubs",
//   icon: 'club',
//   permissions: ['']
// },
{
    name: "sponsorship",
    link: "/sponsor/clubs-sponsorship",
    icon: 'sponsorship',
    permissions: ['']
},
{
    name: "contributions",
    link: "/sponsor/contributions",
    icon: 'sponsors',
    permissions: ['']
},
{
    name: "challengeProposals",
    link: "/sponsor/proposals",
    icon: 'report',
    permissions: ['']
},
{
    name: "testimonials",
    link: "/sponsor/sponsorship-testimonials",
    icon: 'testimonials',
    permissions: ['']
},
])


</script>
