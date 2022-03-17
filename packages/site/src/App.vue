<script setup></script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: unset;
  font-family: "Lato", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  line-height: 1.5;
}

span, p {
  font-size: var(--el-font-size-medium);
  margin-block-start: unset;
}

#app {
  display: flex;
  flex-direction: column;
}

.space {
  flex: 1;
}
</style>
