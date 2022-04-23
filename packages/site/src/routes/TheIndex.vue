<template>
	<div class="background">
		<div class="_1">

		</div>
		<div class="_2">

		</div>
		<div class="_3">

		</div>
	</div>
	<MainBlock/>
	<GettingStart/>
	<Mechanism/>
	<Benefits/>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import MainBlock from "../components/index/MainBlock.vue";
import Mechanism from "../components/index/TheMechanism.vue";
import GettingStart from "../components/index/GettingStart.vue";
import Benefits from "../components/index/TheBenefits.vue";

const height = ref("4237px");
onBeforeMount(() => {
	calculateStyle();
})

function calculateStyle() {
	const main_block_height =  window.document.body.clientWidth / (1920 / 1142) - 108;
	height.value = 4237 - (1142 - main_block_height) + "px";
}
</script>

<style scoped lang="scss">
.background {
	position: absolute;
	width: 100%;
	height: v-bind("height");
	overflow: hidden;
	z-index: -1;

	._1 {
		position: absolute;
		top: 1230px;
		left: 281px;
		width: 310px;
		height: 310px;
		background-image: url("home/block_1.svg");
		background-repeat: no-repeat;
		background-size: contain;
	}

	._2 {
		position: absolute;
		top: 1060px;
		left: 958px;
		width: 1353px;
		height: 1922px;
		background-image: url("home/block_2.svg");
		background-repeat: no-repeat;
		background-size: contain;
	}

	._3 {
		position: absolute;
		top: 3272px;
		left: -176px;
		width: 1339px;
		height: 1902px;
		background-image: url("home/block_3.svg");
		background-repeat: no-repeat;
		background-size: contain;
	}
}
</style>
