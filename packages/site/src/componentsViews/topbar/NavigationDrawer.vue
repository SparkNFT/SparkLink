<template>
  <el-button @click="open = true">Open</el-button>
  <NavigationDrawer v-model="open" :navs="navs"></NavigationDrawer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import NavigationDrawer from "../../components/topBar/NavigationDrawer.vue";
import { INavItem } from "../../components/types";

const open = ref(true);

const route = useRoute();
const fullPath = computed(() => route.fullPath);

const navs = [
  {
    name: "Home",
    path: fullPath.value,
    icon: "home",
  },
  {
    name: "Publish",
    path: "/publish",
    icon: "file_upload",
  },
  {
    name: "Collection",
    path: "/collection",
    icon: "collections",
  },
  {
    name: "Wiki",
    path: "/wiki",
    icon: "notes",
  },
  {
    name: "Market",
    path: "/market",
    icon: "shopping_cart",
  },
] as INavItem[];
</script>
