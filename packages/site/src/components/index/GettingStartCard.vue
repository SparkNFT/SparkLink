<template>
  <div class="card" :class="theClass">
    <el-image :src="iconUrl" class="picture"></el-image>
    <h3 class="title">{{ title }}</h3>
    <p class="info">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  iconUrl: string;
  title: string;
  description: string;
  theClass: string;
}>();
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

$round: 200px;

@mixin _p($position, $value) {
  border-#{$position}-radius: $value;
}

@mixin make-corner($position) {
  @include res("lg-only", $breakpoints-spec) {
    @include _p($position, 100px);
  }

  @include res("xl-only", $breakpoints-spec) {
    @include _p($position, 200px);
  }

  @include res("md-and-down", $breakpoints-spec) {
  }
}

.card {
  flex: 1;
  padding: 88px 25px 25px 25px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #f3f3f3;
  background-color: white;
  box-shadow: 0 45px 55px rgba(18, 17, 39, 0.08);

  @include res("lg-only", $breakpoints-spec) {
    padding: 88px 24px 24px;
  }
  @include res("sm-and-down", $breakpoints-spec) {
    padding: 40px 20px 20px;
    min-height: 300px;
  }

  &._1 {
    @include make-corner(bottom-left);
  }

  &._2 {
    @include make-corner(top-left);
  }

  &._3 {
    @include make-corner(bottom-right);
  }

  &._4 {
    @include make-corner(top-right);
  }

  & + .card {
    margin-left: 30px;
  }

  .picture {
    width: 50px;
    margin-bottom: 49px;

    @include res("sm-and-down", $breakpoints-spec) {
      margin-bottom: 16px;
    }
  }

  .title {
    margin: 0;
    color: #2c2f30;
    font-size: 32px;
    font-weight: bold;

    @include res("xl-only", $breakpoints-spec) {
      min-height: 103px;
    }

    @include res("lg-and-down", $breakpoints-spec) {
      font-size: 26px;
    }

    @include res("lg-only", $breakpoints-spec) {
      min-height: 80px;
    }

    @include res("sm-and-down", $breakpoints-spec) {
      margin-bottom: 38px;
    }
  }

  .info {
    margin: 0;
    color: #8d8d97;
    font-size: var(--el-font-size-extra-large);
    font-weight: 400;
    line-height: 36px;
    text-align: center;
  }
}
</style>
