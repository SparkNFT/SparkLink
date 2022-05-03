<template>
  <section id="benefits" :class="{ 'not-see': !in_the_view }">
    <div class="container">
      <img src="/assets/how-to-benefit/nodes.png" class="nodes" />
      <div class="web3">
        <h1 class="title">Pure Web3 creator economy,</h1>
        <h1 class="title">We are So different from others</h1>

        <p class="text">Unique tree-shaped sharing economy structure</p>
        <p class="text">allows everyone to share and sell node NFT</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";

const { t } = useI18n({
  messages: {
    en: {},
    "zh-CN": {},
  },
});

const in_the_view = ref(false);

onMounted(() => {
  let view_point_height = window.innerHeight;
  const element = document.getElementById("benefits");
  if (!element) throw new Error("element is null");
  const element_top_distance = element.offsetTop;

  window.addEventListener("resize", () => {
    view_point_height = window.innerHeight;
  });

  let view_scroll_top = document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    view_scroll_top = document.documentElement.scrollTop;
    if (view_scroll_top + view_point_height > element_top_distance + 400) {
      in_the_view.value = true;
    } else {
      in_the_view.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#benefits {
  height: 863px;
  padding-top: 200px;
  padding-left: 118px;
  padding-right: 118px;
  box-sizing: border-box;
  overflow-x: hidden;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .nodes {
    width: 50%;
    transition: all 0.8s ease-in-out;
  }

  .web3 {
    transition: all 0.8s ease-in-out;

    .title {
      color: #383838;
      font-size: 45px;
      font-style: normal;
      font-weight: 800;
      line-height: 45px;
      text-align: center;
      @include index.title-underline;
    }

    .text {
      color: #8d8d97;
      font-size: 25px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
      text-align: center;
    }
  }
}

#benefits.not-see {
  .nodes {
    transform: translateX(-300px);
  }

  .web3 {
    transform: translateX(300px);
  }
}
</style>
