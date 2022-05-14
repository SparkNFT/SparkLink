<template>
  <div class="content">
    <MainBlock />
    <div class="with_2">
      <el-image
        v-if="index.blocksHaveBackground.value"
        src="/assets/home/block_2.svg"
        class="_2"
      ></el-image>
      <GettingStart />
      <Mechanism />
    </div>
    <Benefits />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, provide, ref, watch } from "vue";
import MainBlock from "../components/index/MainBlock.vue";
import Mechanism from "../components/index/TheMechanism.vue";
import GettingStart from "../components/index/GettingStart.vue";
import Benefits from "../components/index/TheBenefits.vue";
import { index } from "../states";

const height = ref("4237px");
onBeforeMount(() => {
  calculateStyle();
});

function calculateStyle() {
  const main_block_height =
    window.document.body.clientWidth / (1920 / 1142) - 108;
  height.value = 4237 - (1142 - main_block_height) + "px";
}

</script>

<style scoped lang="scss">
.background {
  position: absolute;
  width: 100%;
  height: v-bind("height");
  overflow: hidden;
  z-index: -1;

  ._1 {
    position: absolute;
    top: 1230px;
    left: 281px;
    width: 310px;
    height: 310px;
    background-image: url("/assets/home/block_1.svg");
    background-repeat: no-repeat;
    background-size: contain;
  }

  ._3 {
    position: absolute;
    top: 3272px;
    left: -176px;
    width: 1339px;
    height: 1902px;
    background-image: url("/assets/home/block_3.svg");
  }
}

.with_2 {
  position: relative;
}

.with_2 > ._2 {
  position: absolute;
  right: -361px;
  top: -8px;
  pointer-events: none;
  z-index: -1;
}

.content {
  position: relative;
  
  top: calc(-1 * var(--header-height));
  &::v-deep a {
    text-decoration-line: none;
  }
}
</style>
