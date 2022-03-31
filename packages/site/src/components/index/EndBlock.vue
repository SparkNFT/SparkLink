<template>
  <section id="end-block" :class="{ mobile: !grid.sm }">
    <div class="end-container">
      <el-image src="/assets/end-block/block-1.svg" class="block block-1" />
      <el-image src="/assets/end-block/block-2.svg" class="block block-2" />
      <div class="end-card">
        <h2 class="title">
          {{ t("title._1") }}<br />
          {{ t("title._2") }}
        </h2>
        <p class="sub-title">
          {{ t("subTitle._1") }} <br />
          {{ t("subTitle._2") }} <br />
          {{ t("subTitle._3") }} <br />
        </p>
        <div class="btn-container">
          <el-button
            class="btn publish link"
            @click="router.push({ name: `publish` })"
          >
            <el-image
              src="/assets/end-block/block-button.svg"
              class="block block-3"
            />
            <span class="btn-text">{{ t("publish") }}</span>
          </el-button>

          <el-button class="btn" @click="connect">
            <span class="btn-text">{{ t("connectWallet") }}</span>
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { web3Operator } from "../../store";
import { grid } from "../../grid";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      publish: "Publish",
      connectWallet: "Connect wallet",
    },
    "zh-CN": {
      publish: "发布",
      connectWallet: "连接钱包"
    }
  },
});

async function connect() {
  await web3Operator.connect();
}

const router = useRouter();
</script>

<style lang="scss" scoped>
#end-block {
  padding: 135px 0;
}
.end-container {
  max-width: 1344px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: auto;
  position: relative;
  top: 0;

  .block {
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }
  .block-1 {
    width: 493px;
    right: 0;
  }
  .block-2 {
    bottom: 0;
    right: 0;
  }

  .block-3 {
    top: 0;
    left: 0;
    height: 100%;
  }

  .end-card {
    border-radius: 20px;
    backdrop-filter: blur(150px);
    background: linear-gradient(
        254.35deg,
        #b657f0 11.37%,
        #4b41a1 51.16%,
        #072152 86.27%
      ),
      linear-gradient(97.19deg, #2e054b 4.58%, #5283cd 93.21%);
    padding: 75px 100px 75px;
    color: white;
    .title {
      font-size: 30px;
      line-height: 2;
      font-weight: 800;
      margin-block-start: unset;
    }
    .sub-title {
      margin-top: 40px;
    }
    .btn-container {
      display: flex;
      margin-top: 50px;
      .btn {
        position: relative;
        background-color: unset;
        border-radius: 15px;
        z-index: 10;
        overflow: hidden;

        &.publish {
          border: unset;
          padding-left: 40px;
          padding-right: 40px;
        }
      }
      .btn-text {
        font-size: var(--el-font-size-extra-large);
        color: white;
        z-index: 2;
        position: relative;
      }
      .link {
        position: relative;
        top: 0;

        box-shadow: 0px 0px 29.9565px rgba(255, 223, 87, 0.5),
          inset 0px 6.91304px 25.3478px #ffdf34,
          inset 0px -6.91304px 9.21739px rgba(255, 250, 215, 0.81);
      }
      .btn + .btn {
        margin-left: 50px;
      }
    }
  }
}

#end-block.mobile {
  padding: unset;
  .end-card {
    border-radius: unset;
    padding: 30px;
    .title,
    .sub-title {
      text-align: center;
    }
    .sub-title {
      margin-top: unset;
    }
    .btn-container {
      flex-direction: column;
      gap: 16px;
      align-items: center;
      .btn {
        min-width: 200px;
      }
      .btn + .btn {
        margin-left: unset;
      }
    }
  }

  .block-3 {
    width: 100%;
  }
}
</style>
