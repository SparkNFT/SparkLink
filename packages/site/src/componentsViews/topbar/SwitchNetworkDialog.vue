<template>
<el-button @click="open=true">open</el-button>
<SwitchNetworkDialog v-model="open"></SwitchNetworkDialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SwitchNetworkDialog from "../../components/topBar/SwitchNetworkDialog.vue";
import { web3Operator } from "../../store";

const open = ref(true);

web3Operator.connect();
</script>
