<template>
	<el-container direction="vertical">
		<section class="description">
			<TopBar />
			<el-main class="main">
				<div v-if="!metaMask.state.hasProvider" class="notification">
					<span>This Site need MetaMask to be installed.</span>
				</div>
				<div class="wrapper">
					<RouterView />
				</div>
			</el-main>
		</section>
		<section class="how-to-start">

		</section>
		<section class="freely-publish">

		</section>
		<section class="differences">

		</section>
		<footer>

		</footer>
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
	.description {
		background-image: url("/public/images/background.png");
		background-size: cover;
		height: 1142rem;
	}

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
