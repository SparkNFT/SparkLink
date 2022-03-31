<template>
  <el-autocomplete
    v-model="modelValue"
    :name="name"
    :fetch-suggestions="queryTokens"
    :highlight-first-item="true"
    @focusout="onFocuseOut()"
  >
    <template v-if="!!token && _isSymbol" #append>{{
      grid.sm
        ? address
        : `${address?.slice(0, 4)}...${address?.slice(address.length - 4)}`
    }}</template>
    <template v-else-if="!!token" #append>
      {{ token.symbol }}
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { chainIdToTokenArr, isSymbol } from "../../token";
import type { IToken } from "../../token";
import { grid } from "../../grid";
import { web3InfoGetter } from "../../store";

defineProps<{
  name: string;
}>();
const emit = defineEmits<{
  (e: "update:address", value: string): void;
}>();

const modelValue = ref("");
const _isSymbol = computed(() => isSymbol(modelValue.value));
const chainId = web3InfoGetter.chain.id;
const token = ref(undefined as IToken | undefined);
const tokenInquirer = web3InfoGetter.tokenInquirer;
watch([modelValue, tokenInquirer], async () => {
  console.log(modelValue.value);
  if (modelValue.value && tokenInquirer.value) {
    token.value = await tokenInquirer.value.query(modelValue.value);
  }
  console.log(`Done ${modelValue.value}`);
});
const address = computed(() => {
  return _isSymbol.value ? token.value?.address : modelValue.value;
});
watch(address, (address) => {
  emit("update:address", address ?? "");
});

const firstCandication = ref("");
type CB = (candicate: { value: string }[]) => void;
function queryTokens(queryString: string, cb: CB) {
  const tokenAddr = chainIdToTokenArr(chainId.value);
  const _result = queryString
    ? tokenAddr.filter(createFilter(queryString))
    : tokenAddr;
  const result = _result.map((token) => {
    return { value: `${token.symbol}` };
  });
  firstCandication.value = result[0]?.value ?? "";
  cb(result);
}

function createFilter(queryString: string) {
  return (token: IToken) => {
    return token.symbol.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
  };
}

function onFocuseOut() {
  if (!modelValue.value) return;
  if (!token.value) {
    modelValue.value = firstCandication.value;
  }
}
</script>
