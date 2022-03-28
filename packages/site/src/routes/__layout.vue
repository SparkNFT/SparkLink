<template>
	<el-container direction="vertical">
		<section class="background"></section>
		<TopBar />
		<main class="main">
			<div v-if="!metaMask.state.hasProvider" class="notification">
				<span>This Site need MetaMask to be installed.</span>
			</div>
			<RouterView />
		</main>
		<the-footer />
	</el-container>
</template>

<script lang="ts" setup>
	import TopBar from "../components/TopBar.vue";
	import {onBeforeRouteUpdate} from "vue-router";
	import {metaMask, ensureProvider, connectWhenNeed} from "../metaMask";
	import TheFooter from "../components/TheFooter.vue";

	ensureProvider();
	// Fire, and forget
	connectWhenNeed();

	onBeforeRouteUpdate(() => connectWhenNeed());
</script>

<style lang="scss" scoped>
	.background {
		position: absolute;
		width: 100%;
		height: 1142rem;
		z-index: -1;
		background-image: url("/public/images/background.png");
		background-size: cover;
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
</style>
