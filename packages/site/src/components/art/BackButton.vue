<template>
  <router-link :to="{name: 'collection'}" class="wrapper">
    <span class="material-icons-outlined icon">keyboard_arrow_left</span>
    <span v-if="needText" class="text">{{ t("_1") }}</span>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n({
  messages: {
    en: {
      _1: "Back to collection",
    },
    "zh-CN": {
      _1: "返回收藏",
    },
  },
});

const route = useRoute();
const needText = computed(() => route.name === "spark");
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  text-decoration: unset;
}

.icon,
.text {
  color: #898989;
}

.icon {
  font-size: 50px;
}

.text {
  font-size: 24px;
  font-weight: 700;
  font-family: Montserrat;
}
</style>
