<template>
  <el-card>
    <el-form label-position="top" class="form">
      <el-form-item label="Item name" class="single-label">
        <el-input name="itemName" />
      </el-form-item>
      <el-form-item label="Percentage of earnings">
        <p class="description">
          When your item is shared and profited by others,what percentage of the
          profits you want from the share of the profits.
        </p>
        <el-input name="percentageOfEarnings" />
      </el-form-item>
      <el-form-item label="Payment currency">
        <p class="description">
          Please select the payment currency of your support (enter token symbol
          or address).
        </p>
        <el-input name="paymentCurrency" />
      </el-form-item>
      <el-form-item label="Selling price" class="single-label">
        <el-input name="sellingPrice" />
      </el-form-item>
      <el-form-item label="Maximum number of shares">
        <p class="description">
          How many times do you want each user to help you spread?
        </p>
        <el-input name="maximum number of shares" placeholder="Up to 65535" />
      </el-form-item>
      <el-form-item label="Work authority" class="single-label">
        <el-checkbox border class="checkbox"
          >Allow secondary creation</el-checkbox
        >
        <el-checkbox border class="checkbox">Allow commercial use</el-checkbox>
        <el-checkbox border class="checkbox"
          >First-class nodes are allowed to be cast free of charge</el-checkbox
        >
      </el-form-item>
      <el-form-item label="Encrypt publish" class="single-label">
        <div class="switch-wrapper">
          <el-switch :active-icon="Check" :inactive-icon="Close" />
          <span class="description">
            Choose open source release by default, users can download and view
            the content of the work regardless of whether the work is purchased
            or not.
          </span>
        </div>
      </el-form-item>
      <el-form-item label="Item description">
        <p class="description">
          Please describe your work in simple words. Accurate and effective description can help other users to understand your work more accurately.
        </p>
        <el-input type="textarea" autosize name="itemDescription" />
      </el-form-item>
      <el-form-item label="Cover picture">
        <p class="description">
          Please upload your cover image in the area below. Cover files support these formats: JPEG/JPG/PNG.
        </p>
        <el-upload
            drag
            multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Item file">
        <p class="description">
          Please upload your work file in the area below.
        </p>
        <el-upload
            class="upload-demo"
            drag
            multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              Multiple file upload is supported,and multiple types of files are supported.
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <div class="divider-line" />
      <div class="btn-area">
        <el-button type="primary">Publish</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { Check, Close, UploadFilled } from "@element-plus/icons";
</script>

<style lang="scss" scoped>
.form {
  :deep(.el-form-item__label) {
    font-size: var(--el-font-size-medium);
    color: black;
    line-height: 1.5;
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

  .checkbox {
    margin-right: 16px;

    & + .checkbox {
      margin-left: unset;
    }
  }

  .switch-wrapper {
    display: flex;
    align-items: center;

    .description {
      margin-left: 16px;
    }
  }

  .el-upload__tip {
    line-height: 1;
  }

  .divider-line {
    margin: 16px 0;
    border-top: var(--el-border-base)
  }

  .btn-area {
    display: flex;
    justify-content: end;
  }
}
</style>
