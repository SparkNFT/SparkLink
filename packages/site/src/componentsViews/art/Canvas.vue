<template>
  <Canvas
    :cover="cover"
    chain="eth"
    name="My Art"
    price="0.00021 ETH"
    url="https://google.com/#"
    logo-url="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB6eD7644C69416d67B522e20bC294A9a9B405B31/logo.png"
  ></Canvas>
</template>

<script lang="ts" setup>
import Canvas from "../../components/art/Canvas.vue";

const cover =
  "https://coldcdn.com/api/cdn/v5ynur/ipfs/QmPTVdcP2HBcKcDZhV8TA4zjjdG65DW8Nc4rEFtM2Hr7nh";
</script>
