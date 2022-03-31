<template>
  <section id="main-block" :class="{ mobile: !grid.sm }">
    <div class="block block-1"></div>
    <div class="block block-2"></div>
    <div class="block block-3"></div>
    <div class="container">
      <h2 class="main-text">
        {{ t("title._1") }} <br />
        {{ t("title._2") }}
      </h2>
      <p class="sub-text">
        {{ t("subTitle._1") }} <br />
        {{ t("subTitle._2") }} <br />
        {{ t("subTitle._3") }} <br />
      </p>
      <div class="btn-area">
        <!-- <el-button color="#478EFD" class="btn primary">
          <span class="btn-text">Explore</span>
        </el-button> -->
        <router-link :to="{ name: `publish` }">
          <el-button color="#478EFD" class="btn primary">
            <span class="btn-text">{{ t("publish") }}</span>
          </el-button>
        </router-link>
      </div>
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

const { t } = useI18n({
  messages: {
    en: {
      publish: "Publish",
      learnMore: "Learn More",
    },
    "zh-CN": {
      publish: "发布",
      learnMore: "了解更多"
    }
  },
});

const router = useRouter();
</script>

<style lang="scss" scoped>
#main-block {
  padding: 64px 0;
  background-color: var(--grey-background);
  overflow: hidden;
  position: relative;

  z-index: 0;

  .block {
    position: absolute;
    z-index: 1;
    filter: blur(30px);
    opacity: 0.4;
    border-radius: 50%;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    overflow: hidden;
    &.block-1 {
      width: 700px;
      background: conic-gradient(
        from 168.09deg at 50% 50%,
        #5cffe4 -160.13deg,
        rgba(255, 128, 250, 0.7) 42.37deg,
        #5cffe4 199.87deg,
        rgba(255, 128, 250, 0.7) 402.37deg
      );
      transform: rotate(97.38deg);
      left: -270px;
      bottom: -100px;
    }
    &.block-2 {
      width: 650px;
      background: conic-gradient(
        from 168.09deg at 50% 50%,
        #66ffe6 -160.13deg,
        rgba(128, 147, 255, 0.6) 42.37deg,
        #66ffe6 199.87deg,
        rgba(128, 147, 255, 0.6) 402.37deg
      );
      transform: rotate(-44.13deg);
      right: -100px;
      top: -300px;
    }
    &.block-3 {
      width: 500px;
      background: conic-gradient(
        from 168.09deg at 50% 50%,
        #d6ff89 -160.13deg,
        rgba(128, 255, 253, 0.6) 42.37deg,
        #d6ff89 199.87deg,
        rgba(128, 255, 253, 0.6) 402.37deg
      );
      opacity: 0.4;
      filter: blur(130px);
      transform: rotate(-144.4deg);
      bottom: -250px;
      right: 0;
    }
  }
  .container {
    position: relative;
    z-index: 10;
  }
}

.column-1 {
  display: flex;
  flex-direction: column;
}

.logo {
  width: 400px;
}

.main-text,
.sub-text {
  text-align: center;
}

.main-text {
  font-size: 40px;
  line-height: 1.5;
  font-weight: 800;

  margin-top: calc(272px - 64px);
}

.sub-text {
  font-size: var(--el-font-size-extra-large);
  margin-top: 50px;
  color: var(--el-color-info);
  &.learn-more {
    display: block;
    color: var(--el-color-primary);
    margin-top: 92px;
    margin-bottom: cacl(100px - 64px);
    text-decoration: underline;
    cursor: pointer;
  }
}

.divider {
  height: 16px;
}

.btn-area {
  display: flex;
  margin-top: 165px;
  justify-content: center;
  .btn {
    padding: 20px 80px;
    border-radius: 15px;
    &.primary {
      color: white;
    }
    & + * {
      margin-left: 80px;
    }
    .btn-text {
      font-size: var(--el-font-size-extra-large);
    }
  }
}

.mobile {
  .main-text {
    font-size: 28px;
  }
  .sub-text {
    font-size: var(--el-font-size-medium);
  }
  .btn-area {
    .btn {
      padding: 12px 50px;
    }
    .btn-text {
      font-size: var(--el-font-size-medium);
    }
  }
}
</style>
