<template>
  <Dialog v-model="open" title="Demo">
    <template #desktop> This is a demo dialog </template>
    <template #bottom>
      <el-button type="primary">OK</el-button>
      <el-button>Cancel</el-button>
    </template>
    <template #mobile>
      This is a demo drawer.
      <el-button type="primary">OK</el-button>
      <el-button>Cancel</el-button>
    </template>
  </Dialog>
  <el-button @click="open = true">Open</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Dialog from "../components/Dialog.vue";

const open = ref(true);
</script>
