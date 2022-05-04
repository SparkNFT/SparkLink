<template>
  <el-form
    ref="form"
    :model="data"
    :rules="rules"
    label-position="top"
    class="form"
  >
    <el-form-item
      :label="t('inputs.name.label')"
      class="single-label"
      prop="name"
    >
      <el-input v-model="data.name" name="itemName" style="width: 563px" />
    </el-form-item>
    <el-form-item
      :label="t('inputs.earning.label')"
      prop="percentageOfEarnings"
    >
      <p class="description">{{ t("inputs.earning.description") }}</p>
      <el-input-number
        v-model="data.percentageOfEarnings"
        name="percentageOfEarnings"
        :controls="false"
        :min="0"
        :max="100"
        :precision="0"
      />
    </el-form-item>
    <el-form-item :label="t('inputs.currency.label')" prop="paymentCurrency">
      <p class="description">
        {{ t("inputs.currency.description") }}
        <br /><br />
        {{ t("inputs.currency.chain") }} <strong>{{ chain }}</strong
        >.
      </p>
      <payment-currency-selector
        style="width: 862px"
        name="paymentCurrency"
        @update:address="updatePaymentCurrency"
      />
    </el-form-item>
    <el-form-item :label="t('inputs.price.label')" prop="sellingPrice">
      <p class="description">{{ t("inputs.price.description") }}</p>
      <el-input-number
        v-model="data.sellingPrice"
        :controls="false"
        size="large"
        name="sellingPrice"
        style="width: 862px"
      />
    </el-form-item>
    <el-form-item :label="t('inputs.shares.label')" prop="maxShareTimes">
      <p class="description">
        {{ t("inputs.shares.description") }}
      </p>
      <el-input-number
        v-model="data.maxShareTimes"
        name="maximum number of shares"
        :controls="false"
        :placeholder="t('inputs.shares.placeHolder')"
        :min="0"
        :max="65535"
        :precision="0"
        style="width: 862px"
      />
    </el-form-item>
    <el-form-item
      :label="t('inputs.royaltyPrice.label')"
      prop="royaltyPrice"
      class="single-label"
    >
      <el-input-number
        v-model="data.royaltyPrice"
        name="royalty price"
        :controls="false"
        :placeholder="t('inputs.royaltyPrice.placeHolder')"
        :min="0"
        size="large"
        style="width: 862px"
      />
    </el-form-item>
    <el-form-item
      :label="t('inputs.authority.label')"
      class="single-label"
      prop="checkboxGroupsObj"
    >
      <meta-checkbox-group
        checkbox-class="checkbox"
        @update:model-value="updateMetas"
      />
    </el-form-item>
    <el-form-item
      :label="t('inputs.encrypt.label')"
      class="single-label"
      prop="encrypted"
    >
      <div class="switch-wrapper">
        <el-switch
          v-model="data.encrypted"
          :active-icon="Check"
          :inactive-icon="Close"
        />
        <span class="description">{{ t("inputs.encrypt.description") }}</span>
      </div>
    </el-form-item>
    <el-form-item :label="t('inputs.description.label')" prop="description">
      <p class="description">{{ t("inputs.description.description") }}</p>
      <el-input
        v-model="data.description"
        type="textarea"
        autosize
        name="itemDescription"
      />
    </el-form-item>
    <div class="upload-container">
      <el-form-item :label="t('inputs.upload.cover.label')" prop="files.cover">
        <p class="description">
          {{ t("inputs.upload.cover.description") }}
        </p>
        <el-upload
          ref="coverUploader"
          drag
          multiple
          :auto-upload="false"
          action="https://jsonplaceholder.typicode.com/posts"
          :http-request="fakeRequest"
          :on-change="onCoverChange"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            {{ t("inputs.upload.hint._1")
            }}<em>{{ t("inputs.upload.hint._2") }}</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item
        :label="t('inputs.upload.content.label')"
        prop="files.content"
      >
        <p class="description">
          {{ t("inputs.upload.content.description") }}
        </p>
        <el-upload
          ref="contentUploader"
          class="upload-demo"
          drag
          multiple
          :auto-upload="false"
          action="https://jsonplaceholder.typicode.com/posts"
          :http-request="fakeRequest"
          :on-change="onContentChange"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            {{ t("inputs.upload.hint._1")
            }}<em>{{ t("inputs.upload.hint._2") }}</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              {{ t("inputs.upload.tip") }}
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </div>
    <div class="btn-area">
      <el-button type="danger" @click="submit" class="publish-btn"
        >{{ t("btn.publish") }}
      </el-button>
    </div>
    <publish-in-progress
      v-if="showProgressDialog"
      v-model="showProgressDialog"
      :event-emitter="eventEmitter"
      :encryted="data.encrypted"
      @listeners:attached="beginUpload"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { grid } from "../../grid";
import { Check, Close, UploadFilled } from "@element-plus/icons";
import { useStore } from "vuex";
import type { UserOperatorFactory } from "@SparkLink/business";
import { computed, reactive, ref } from "vue";
import type {
  IUploadEventEmitter,
  IUserInputForm,
} from "@SparkLink/business/generated/src/uploader";
import { Address, UniFile } from "@SparkLink/business";
import type Web3 from "web3";
import PaymentCurrencySelector from "./PaymentCurrencySelector.vue";
import MetaCheckboxGroup from "./MetaCheckboxGroup.vue";
import type { Rules } from "async-validator";
import PublishInProgress from "./PublishInProgress.vue";
import { useI18n } from "vue-i18n";
import { map } from "underscore";

const { t } = useI18n({
  messages: {
    en: {
      validate: "This field is required",
      inputs: {
        name: {
          label: "Work Name",
          validate: {
            max: "Name should be a string whose length is under 64.",
          },
        },
        earning: {
          label: "Percentage of Earnings",
          description:
            "When your item is shared and profited by others,what percentage of the" +
            "profits you want from the share of the profits.",
          validate: {
            range: "Number out of bounds.",
          },
        },
        currency: {
          label: "Payment Currency",
          description:
            "Please select the payment currency of your support (enter token symbol or paste token contract address).",
          chain: "Current chain: ",
        },
        price: {
          label: "Selling Price",
          description: "In coin, not in wei.",
        },
        shares: {
          label: "Maximum number of shares",
          description:
            "How many times do you want each user to help you spread?",
          placeHolder: "Up to 65535, Interger",
        },
        baseline: {
          label: "Price Baseline of the child nodes (Percentage)",
          placeHolder: "0 to 255, Interger",
        },
        royaltyPrice: {
          label: "The royalty price the author could get when sold a nft.",
          placeHolder: "In coin, not in wei.",
        },
        authority: {
          label: "Work Permission",
        },
        encrypt: {
          label: "Encrypt publish",
          description:
            "Choose open source release by default, users can download and view" +
            "the content of the work regardless of whether the work is purchased" +
            "or not.",
        },
        description: {
          label: "Work description",
          description:
            "Please describe your work in simple words. Accurate and effective" +
            "description can help other users to understand your work more" +
            "accurately.",
        },
        upload: {
          hint: {
            _1: "Drop file here or ",
            _2: "click to upload",
          },
          tip:
            "Multiple file upload is supported,and multiple types of files are" +
            "supported.",
          cover: {
            label: "Cover Photo",
            description:
              "Please upload your cover image in the area below. Cover files support" +
              "these formats: JPEG/JPG/PNG.",
          },
          content: {
            label: "Work file",
            description: "Please upload your work file in the area below.",
          },
        },
      },
      btn: {
        publish: "Publish",
      },
    },
    "zh-CN": {
      validate: "必填。",
      inputs: {
        name: { label: "作品名称", validate: { max: "字段长度需小于64。" } },
        earning: {
          label: "抽成百分比",
          description:
            "当您的作品内容被其他人分销和获利时，您希望从他人利润份额中获得多少百分比的利润",
          validate: {
            range: "数值越界。",
          },
        },
        currency: {
          label: "结算代币",
          description: "请选择您支持的支付货币 (输入代币符号)",
          chain: "当前链：",
        },
        price: {
          label: "售价",
          description: "以货币而非以太为结算单位",
        },
        shares: {
          label: "最大节点分销次数",
          description: "您希望每个用户可分销多少次？",
          placeHolder: "0 - 65535, 整数",
        },
        baseline: {
          label: "子节点的价格基线（百分比）",
          placeHolder: "0 - 255，整数",
        },
        royaltyPrice: {
          label: "销售版税",
          placeHolder: "以货币而非以太为结算单位",
        },
        authority: {
          label: "作品许可",
        },
        encrypt: {
          label: "加密发布",
          description:
            "默认选择开源发布，无论是否购买该作品，用户都可以下载并查看该作品内容。",
        },
        description: {
          label: "作品描述",
          description:
            "请用简单的话语对您的作品进行描述，精准有效的描述能帮助其他用户更准确得了解您的作品。",
        },
        upload: {
          hint: {
            _1: "拖拽文件到此处或者",
            _2: "点击上传文件",
          },
          tip: "支持多个文件上传，并支持多种类型的文件。",
          cover: {
            label: "封面图片",
            description:
              "请在下方区域上传您的封面图片 封面文件支持这些格式：JPEG/JPG/PNG",
          },
          content: {
            label: "作品文件",
            description: "请在下方区域上传您的作品文件",
          },
        },
      },
      btn: {
        publish: "发布",
      },
    },
  },
});

interface Data {
  name: string;
  percentageOfEarnings: number;
  paymentCurrency: string;
  sellingPrice: number;
  maxShareTimes: number;
  royaltyPrice: number;
  encrypted: boolean;
  description: string;
  checkboxGroupsObj: {
    allowSecondaryCreation: boolean;
  };
  files: {
    cover: File | undefined;
    content: File[];
  };
}

const data = reactive({
  name: "",
  percentageOfEarnings: NaN,
  paymentCurrency: "",
  sellingPrice: NaN,
  maxShareTimes: NaN,
  royaltyPrice: NaN,
  encrypted: false,
  description: "",
  checkboxGroupsObj: {
    allowSecondaryCreation: false,
    allowCommercialUsage: false,
    freeForSecondLevel: false,
  },
  files: {
    cover: undefined,
    content: [],
  },
} as Data);

function onValueChange(field: string, value: number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (data[field] && data[field] !== value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    data[field] = value;
  }
}

const store = useStore();
const chain = computed(() => store.getters["web3/chainName"]);
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const uploader = computed(() => factory.value.uploader);

function updatePaymentCurrency(address: string) {
  data.paymentCurrency = address;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function updateMetas(meta) {
  data.checkboxGroupsObj = meta;
}

const web3 = computed(() => store.state.web3.web3 as Web3);

function covertToUserInputForm(data: Data): IUserInputForm {
  const _checkboxGroupObj = data.checkboxGroupsObj;
  const toWei = web3.value.utils.toWei;
  return {
    name: data.name,
    percentageOfEarnings: data.percentageOfEarnings as number,
    paymentCurrency: new Address(data.paymentCurrency),
    sellingPrice: BigInt(toWei((data.sellingPrice as number).toString())),
    maxShareTimes: data.maxShareTimes as number,
    allowSecondaryCreation: _checkboxGroupObj.allowSecondaryCreation,
    encrypted: data.encrypted,
    description: data.description,
    royaltyPrice: BigInt(toWei((data.royaltyPrice as number).toString())),
    cover: new UniFile(data.files.cover as File),
    content: data.files.content.map((e) => new UniFile(e)),
  } as IUserInputForm;
}

const form = ref(
  null as {
    validate: (
      callback: (validated: boolean, errFields: object) => void
    ) => void;
  } | null
);
const coverUploader = ref(null as { submit: () => void } | null);
const contentUploader = ref(null as { submit: () => void } | null);

async function submitUpload() {
  coverUploader.value?.submit();
  contentUploader.value?.submit();
}

function fakeRequest() {
  return;
}

type ElFile = { raw: File };

function onCoverChange(file: ElFile) {
  data.files.cover = file.raw;
}

function onContentChange(file: ElFile, files: ElFile[]) {
  data.files.content = files.map((f) => f.raw);
}

const rules = {
  name: [
    {
      required: true,
      message: t("validate"),
    },
    { max: 64, message: t("inputs.name.validate.max") },
  ],
  percentageOfEarnings: [
    {
      required: true,
      message: t("validate"),
    },
    {
      type: "integer",
      min: 0,
      max: 100,
      trigger: "blur",
      message: t("inputs.earning.validate.range"),
    },
  ],
  paymentCurrency: {
    required: true,
    message: t("validate"),
  },
  sellingPrice: [
    {
      type: "number",
      trigger: "blur",
      required: true,
      message: t("validate"),
    },
  ],
  maxShareTimes: {
    type: "integer",
    required: true,
    trigger: "blur",
    message: t("validate"),
  },
  baseline: {
    type: "integer",
    required: true,
    trigger: "blur",
    message: t("validate"),
  },
  description: {
    required: true,
    message: t("validate"),
  },
  "files.cover": {
    required: true,
    message: t("validate"),
  },
  "files.content": {
    required: true,
    message: t("validate"),
  },
} as Rules;

const showProgressDialog = ref(false);
const eventEmitter = ref(null as IUploadEventEmitter | null);
const runUploadPromise = ref(null as (() => Promise<void>) | null);

async function submit() {
  const validationPromise = new Promise((resolve) => {
    if (!form.value) resolve(false);
    form.value?.validate((validated) => {
      resolve(validated);
    });
  });
  const validated = await validationPromise;
  if (!validated) return;
  submitUpload();
  showProgressDialog.value = true;
  const formdata = covertToUserInputForm(data);
  const { eventEmitter: _eventEmitter, runUploadPromise: _runUploadPromise } =
    uploader.value.upload(formdata);
  eventEmitter.value = _eventEmitter;
  runUploadPromise.value = _runUploadPromise;
}

async function beginUpload() {
  if (!runUploadPromise.value) return;
  await runUploadPromise.value();
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item.is-required:not(.is-no-asterisk))
  > .el-form-item__label:before {
  content: none;
}

:deep(.el-form-item.is-required:not(.is-no-asterisk))
  > .el-form-item__label:after {
  content: "*";
  color: var(--el-color-danger);
  margin-right: 4px;
}

.form {
  :deep(.el-textarea__inner),
  :deep(.el-input__inner),
  :deep(.el-upload-dragger) {
    border: 2px solid black;
    border-radius: 5px;
  }

  :deep(.el-form-item__label) {
    color: #2c2f30;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
  }

  :deep(.el-input-number) {
    width: 250px;
  }

  :deep(.el-autocomplete) {
    min-width: 250px;
  }

  :deep(.checkbox) {
    margin-right: 16px;

    & + .checkbox {
      margin-left: unset;
    }
  }

  .single-label {
    :deep(.el-form-item__label) {
      padding-bottom: 16px;
    }
  }

  .description {
    font-size: var(--el-font-size-base);
    color: var(--el-color-info);
    line-height: 1;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;

    .description {
      margin-left: 16px;
    }
  }

  .upload-container {
    display: flex;
    align-items: center;
  }

  .el-upload__tip {
    line-height: 1;
  }

  .divider-line {
    margin: 16px 0;
    border-top: var(--el-border-base);
  }

  .btn-area {
    margin-top: 103px;
    margin-bottom: 140px;
    text-align: center;

    .publish-btn {
      width: 267px;
      height: 70px;
      background: #ef7a61;
      border-radius: 15px;

      &:hover {
        color: #ff6e65;
        background: #ffea07;
        border-color: #ffea07;
      }

      :deep(span) {
        font-weight: 700;
        font-size: 24px;
      }
    }
  }
}

.embed {
  border: unset;
  box-shadow: unset;
}
</style>
