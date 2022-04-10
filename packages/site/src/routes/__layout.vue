<template>
	<el-container direction="vertical" style="min-height: 100vh;" :class="{embed: !grid.lgPlus}">
		<TopBar :sticky="topBarShouldBeSticky"/>
		<el-main :class="['main', {'with-background': route.name === 'index'}]">
			<div>
				<RouterView/>
			</div>
		</el-main>
		<the-footer/>
	</el-container>
</template>

<script lang="ts" setup>
import {grid} from "../grid";
import TopBar from "../components/TopBar.vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {computed} from "vue";
import {web3Operator} from "../store";
import {onMounted} from "vue";
import TheFooter from "../components/TheFooter.vue";

onBeforeRouteUpdate(() => {
	web3Operator.connectWhenNeed();
});

onMounted(() => web3Operator.connectWhenNeed())
const route = useRoute();
const topBarShouldBeSticky = computed(() => {
	return route.name !== "index";
});
</script>

<style lang="scss" scoped>
.main {
	padding: 108px 0 0 0;
}

.main.with-background {
	background-image: url("/assets/background.png");
	background-repeat: no-repeat;
	background-size: contain;
}

.notification {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	background-color: var(--el-border-color-extra-light);
	color: var(--el-text-color-regular);
	padding: 16px 32px;

	&.offset {
		position: absolute;
		top: 65px;
		z-index: 100;
		background-color: unset;
	}
}

.embed {
	.wrapper {
		width: 100%;
	}
}
</style>
