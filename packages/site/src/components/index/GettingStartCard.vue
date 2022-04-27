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
.card {
  flex: 1;
  padding: 88px 25px 25px 25px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #f3f3f3;
  background-color: white;
  box-shadow: 0 45px 55px rgba(18, 17, 39, 0.08);

  &._1 {
    border-radius: 20px 20px 20px 200px;
  }

  &._2 {
    border-radius: 200px 20px 20px 20px;
  }

  &._3 {
    border-radius: 20px 20px 200px 20px;
  }

  &._4 {
    border-radius: 20px 200px 20px 20px;
  }

  & + .card {
    margin-left: 30px;
  }

  .picture {
    width: 61px;
    margin-bottom: 49px;
  }

  .title {
    margin: 0;
    min-height: 103px;
    color: #2c2f30;
    font-size: 32px;
    font-weight: bold;
  }

  .info {
    margin: 0;
    color: #8d8d97;
    font-size: 20px;
    font-weight: 400;
    line-height: 36px;
  }
}
</style>
