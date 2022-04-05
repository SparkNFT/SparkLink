<template>
  <div>
    <p v-if="loading" class="loading">
      <span class="material-icons-outlined icon">downloading</span
      >{{ t("hint.loading") }}
    </p>
      <div ref="canvasContainer" class="canvas-container"></div>
      <div id="drawing" ref="drawing" class="drawing">
        <img ref="coverImage" :src="cover" class="cover" :onerror="retry" />
        <h2 class="name">{{ name }}</h2>
        <p class="chain">chain {{ chain }}</p>
        <p class="price">{{ price }}<img :src="logoUrl" /></p>
        <img :src="qr" class="qrcode" />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import html2canvas from "html2canvas";
import {useI18n} from "vue-i18n";

const {t} = useI18n({messages: {
  en: {
    
  }
}});

const props = defineProps<{
  cover: string;
  name: string;
  price: string;
  chain: string;
  url: string;
  width?: string;
  logoUrl: string;
}>();

const emit = defineEmits<{
  (e: "update:image", value: Blob): void
}>();

const coverImage = ref(null as HTMLImageElement | null);
const canvasContainer = ref(null as HTMLDivElement | null);
const drawing = ref(null as HTMLDivElement | null);
const canvas = ref(null as HTMLCanvasElement | null);

const qr = computed(() => {
  const _t = new URLSearchParams();
  _t.append("size", "264x264");
  _t.append("data", props.url);
  console.log(_t.toString());
  return "https://api.qrserver.com/v1/create-qr-code/?" + _t.toString();
});

const loading = ref(true);

watch(drawing, async () => {
  const result = await html2canvas(drawing.value as HTMLDivElement, {
    useCORS: true,
    onclone: (cloned) => {
      (cloned.getElementById("drawing") as HTMLDivElement).style.display =
        "flex";
    },
  });
  if (props.width) result.style.width = props.width;
  result.style.height = "unset";
  canvas.value = result;
  (canvasContainer.value as HTMLDivElement).append(result);
  result.toBlob((blob) => emit("update:image", blob as Blob))
  loading.value = false;
});

function retry() {
  if (!coverImage.value) return;
  const cover = coverImage.value as HTMLImageElement;
  console.log(cover.src, cover.currentSrc);
  var src = cover.src;
  cover.src = src;
}
</script>

<style lang="scss" scoped>
.canvas {
  image-rendering: pixelated;
}

.drawing {
  display: none;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  width: 1080px;
  height: 1695px;
  background: url(/assets/art/poster.svg) no-repeat;
}
.cover {
  width: fit-content;
  height: 635px;
  margin-top: 312px;
}
.name {
  margin-top: 20px;
  font-size: 48px;
}

.chain {
  font-size: 36px;
  color: var(--el-color-info);
}

.price {
  margin-top: 20px;
  font-size: 50px;
  color: var(--el-color-primary);
  display: flex;
  gap: 32px;
  justify-content: center;
  div, img {
    height: 64px;
    width: 64px;
  }
}

.name,
.chain,
.price {
  margin-block-start: unset;
  margin-block-end: unset;
}

.loading {
  text-align: center;
  font-size: 20px;
  margin-bottom: 32px;
  .icon {
    vertical-align: middle;
    margin-right: 20px;
    font-size: 30px;
  }
}
</style>
