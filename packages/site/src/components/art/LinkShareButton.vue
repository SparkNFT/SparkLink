<template>
  <Button :type="Type.Outlined" @click="copyLink">
    <template #icon>
      <span class="material-icons-outlined">local_fire_department</span>
    </template>
    <span>{{ t("text") }}</span>
  </Button>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Button, { Type } from "../Button.vue";
import { setupShareLink } from "./data";

const { t } = useI18n({
  messages: {
    en: {
      text: "Link sharing",
      copyLink: {
        hint: "The link has been copyed to your clipboard.",
        prefix: "You are welcome to view and try casting my NFT publication: ",
      },
    },
    "zh-CN": {
      text: "复制链接",
      copyLink: {
        hint: "链接已被复制到剪切板。",
        prefix: "欢迎来到Sparklink查看并分享我的NFT作品：",
      },
    },
  },
});

const { shareLink } = setupShareLink();

function copyLink() {
  const clipboard = navigator.clipboard;
  clipboard.writeText(`${t("copyLink.prefix")}${shareLink.value}`);
  ElMessage({
    type: "success",
    message: t("copyLink.hint"),
  });
}
</script>
