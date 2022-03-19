<template>
	<el-container direction="vertical">
		<TopBar />
		<el-main class="main">
			<div v-if="!metaMask.state.hasProvider" class="notification">
				<span>This Site need MetaMask to be installed.</span>
			</div>
			<div class="wrapper">
				<RouterView />
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts" setup>
	import TopBar from "../components/TopBar.vue";
	import {onBeforeRouteUpdate} from "vue-router";
	import {metaMask, ensureProvider, connectWhenNeed} from "../metaMask";

	ensureProvider();
	// Fire, and forget
	connectWhenNeed();

	onBeforeRouteUpdate(() => connectWhenNeed());
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
	}

	.notification {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--el-border-color-extra-light);
		color: var(--el-text-color-regular);
		padding: 16px 32px;
	}

	.wrapper {
		width: 1344px;
	}
</style>
