<script setup>
	import {onBeforeMount} from "@vue/runtime-dom";

	function calculateRootFontSize() {
		const width = document.documentElement.clientWidth;
		document.documentElement.style.fontSize = `${width / 1920}px`;
	}

	onBeforeMount(calculateRootFontSize);
</script>

<template>
	<RouterView />
</template>

<style>
	/* use rem to compatible more resolution */
	html {
		font-size: 1px;
	}

	body {
		margin: unset;
		font-family: "Lato", "Helvetica Neue", Helvetica, "PingFang SC",
		"Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}

	::-webkit-scrollbar{width:0;}
</style>
