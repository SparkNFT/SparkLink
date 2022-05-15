<template>
  <section
    id="main-block"
    :class="{ mobile: !grid.sm, 'not-see': !in_the_view }"
  >
    <div class="background">
      <div class="imgs"></div>
    </div>
    <div class="container">
      <h2 class="main-text title _1">
        {{ t("title._1") }}<br />{{ t("title._2") }}
      </h2>
      <p class="sub-text sub-title">
        {{ t("description._1") }}<br />{{ t("description._2") }}
      </p>
      <router-link :to="{ name: `publish` }">
        <el-button color="#478EFD" class="btn primary publish-btn">
          {{ t("publish") }}
        </el-button>
      </router-link>
      <br />
      <router-link :to="{ name: `wiki` }" class="sub-text learn-more">
        {{ t("learnMore") }}
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { grid } from "../../grid";
import { onMounted, ref, onBeforeMount } from "vue";

const { t } = useI18n({
  messages: {
    en: {
      title: {
        _1: "Redefining publishing and",
        _2: "distribution.",
      },
      description: {
        _1: "Sparking creators, Linking audiences.",
        _2: "Bringing creators and audiences closer than ever before.",
      },
      publish: "Publish",
      learnMore: "Learn More",
    },
    "zh-CN": {
      title: {
        _1: "出版和传播，",
        _2: "被我们重新定义。",
      },
      description: {
        _1: "出版你的作品，传播你的热情",
        _2: "将所有人连接起来，这是我们的愿望。",
      },
      publish: "发布",
      learnMore: "了解更多",
    },
  },
});
const in_the_view = ref(false);
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    in_the_view.value = true;
  }, 1000);

  window.addEventListener("resize", () => {
    calculateStyle();
  });
});

const padding_top = ref("272px");

onBeforeMount(() => {
  calculateStyle();
});

function calculateStyle() {
  if (window.document.body.clientWidth < 1600) {
    padding_top.value =
      (window.document.body.clientWidth / 1920) * 200 - 100 + "px";
  } else {
    padding_top.value = (window.document.body.clientWidth / 1920) * 200 + "px";
  }
}
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

.background {
  position: absolute;
  top: 0;
  background: linear-gradient(
      203.56deg,
      rgba(255, 255, 255, 0.2) 14.77%,
      rgba(255, 248, 235, 0.18125) 21.72%,
      rgba(0, 0, 0, 0) 80.72%
    ),
    linear-gradient(230.61deg, #fecc80 1.01%, #f77878 27.21%, #56557e 87.73%);
}

#main-block,
.background {
  width: 100%;
  height: 100vh;
  .imgs {
    position: absolute;
    left: 52%;
    transform: translateX(-50%);
    width: 1920px;
    height: 550px;
    top: 20%;
    background: url(/assets/home/mainBlock/desktop.png);
    background-size: contain;
    background-repeat: no-repeat;
    overflow: visible;

    @include res("xs-only", $breakpoints-spec) {
      background-image: url(/assets/home/mainBlock/mobile.png);
      width: 609px;
      height: 495px;
      top: 11%;
    }
  }
}

#main-block {
  overflow: hidden;
  position: relative;
  height: 100vh;

  .container {
    text-align: center;
    position: relative;
    top: 30%;
    box-sizing: border-box;
    height: 100%;

    @include res("xs-only", $breakpoints-spec) {
      top: 22%;
    }

    .main-text {
      margin: 0 0 50px;
      color: #f5f5f5;
      font-weight: bolder;
      font-size: 58px;
      line-height: 1.5;
      @include res("xs-only", $breakpoints-spec) {
        font-size: 28px;
        margin: 0 20px 50px;
      }
    }

    #main-block:first-child .main-text {
      margin-bottom: 38px;
    }

    .sub-text {
      margin: 0;
      color: #f5f5f5;
      font-size: 24px;
      line-height: 1.5;

      @include res("xs-only", $breakpoints-spec) {
        font-size: var(--el-font-size-large);
        margin: 0 40px;
      }
    }

    &:first-child .sub-text {
      margin-bottom: 10px;
    }

    .publish-btn {
      padding: 0 100px;
      height: 82px;
      margin-top: 150px;
      margin-bottom: 75px;
      border-radius: 15px;
      border: none;
      color: #ff6830;
      font-weight: bold;

      @include res("xs-only", $breakpoints-spec) {
        margin-bottom: 20px;
        height: 54px;
        padding: 0 64px;
      }

      :deep(span) {
        font-size: 30px;
        @include res("xs-only", $breakpoints-spec) {
          font-size: 20px;
        }
      }

      background: linear-gradient(
        77.37deg,
        #fc5151 3.37%,
        #ffe177 55.28%,
        #ffa370 99.2%
      );

      &:hover {
        filter: drop-shadow(0px 0px 28px #ffe177);
      }
    }

    .learn-more {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}

.title {
  transition: all 0.5s ease-in-out;
}

.sub-title {
  transition: all 1s ease-in-out;
}

.publish-btn {
  transition: all 1.5s ease-in-out;
}

.learn-more {
  transition: all 1.5s ease-in;
}

.not-see {
  .title,
  .sub-title,
  .publish-btn,
  .learn-more {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>
