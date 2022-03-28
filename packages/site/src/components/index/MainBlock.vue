<template>
	<section id="main-block">
		<h2 class="main-text">Publishing and distribution,</h2>
		<h2 class="main-text">are redefined by us.</h2>
		<p class="sub-text">Publish your love, share your love, spread your love</p>
		<p class="sub-text">link all creators and sharers together,that is what we doing.</p>
		<el-button id="publish-btn" type="primary" @click="gotoPublishPage">Publish</el-button>
		<br>
		<a id="learn-more-btn">Learn more</a>
	</section>
	<how-to-start />
	<freely-publish />
	<the-differences />
</template>

<script lang="ts" setup>
	import {useRouter} from "vue-router";
	import HowToStart from "./HowToStart.vue";
	import FreelyPublish from "./FreelyPublish.vue";
	import TheDifferences from "./TheDifferences.vue";

	const router = useRouter();

	function gotoPublishPage() {
		router.push("/publish")
	}
</script>

<style lang="scss" scoped>
	#main-block {
		text-align: center;
		padding-top: 272rem;
		box-sizing: border-box;
		height: 1034rem;
	}

	.main-text {
		margin: 0 0 50rem;
		color: #f5f5f5;
		font-weight: bolder;
		font-size: 58rem;
		line-height: 100%;
	}

	#main-block:first-child .main-text {
		margin-bottom: 38rem;
	}

	.sub-text {
		margin: 0;
		color: #f5f5f5;
		font-size: 24rem;
		line-height: 100%;
	}

	#main-block:first-child .sub-text {
		margin-bottom: 10rem;
	}

	#publish-btn {
		width: 308rem;
		height: 82rem;
		margin-top: 150rem;
		margin-bottom: 75rem;
		border-radius: 15rem;
		border: none;
		color: #ff6830;
		font-size: 30rem;
		font-weight: bold;
		background: linear-gradient(77.37deg, #FC5151 3.37%, #FFE177 55.28%, #FFA370 99.2%);
	}

	#learn-more-btn {
		font-size: 24rem;
		color: #ef7a61;
		text-decoration: underline;
	}
</style>