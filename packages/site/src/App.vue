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
@font-face {
	font-family: "Inter";
	src: url("/fonts/Inter-UI-Regular.woff2") format("woff2"),
	url("/fonts/Inter-UI-Regular.woff") format("woff");
}
	/* use rem to compatible more resolution */
	html {
		font-size: 1px;
		font-family: Inter;
	}

	body {
		margin: unset;
		font-family: "Lato", "Helvetica Neue", Helvetica, "PingFang SC",
		"Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}

	/*::-webkit-scrollbar{width:0;}*/
</style>
