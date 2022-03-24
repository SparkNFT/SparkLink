<template>
	<section id="main-block">
		<h2 class="main-text">Publishing and distribution,</h2>
		<h2 class="main-text">are redefined by us.</h2>
		<p class="sub-text">Publish your love, share your love, spread your love</p>
		<p class="sub-text">link all creators and sharers together,that is what we doing.</p>
		<el-button id="publish-btn" type="primary" @click="gotoPublishPage">Publish</el-button>
		<a id="learn-more-btn">Learn more</a>
	</section>
	<how-to-start/>
	<freely-publish/>
	<the-differences/>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 130rem 0;
		box-sizing: border-box;
		height: 1034rem;
	}

	.main-text {
		display: inline-block;
		margin: 20rem 0;
		color: #f5f5f5;
		font-weight: bolder;
		font-size: 58rem;
	}

	.sub-text {
		display: inline-block;
		margin: 2rem 0;
		color: #f5f5f5;
		font-size: 24rem;
	}

	#publish-btn {
		width: 308rem;
		height: 82rem;
		margin-top: 120rem;
		border-radius: 15rem;
		border: none;
		color: #ff6830;
		font-size: 30rem;
		font-weight: bold;
		background: linear-gradient(77.37deg, #FC5151 3.37%, #FFE177 55.28%, #FFA370 99.2%);
	}

	#learn-more-btn {
		margin-top: 80rem;
		font-size: 24rem;
		color: #ef7a61;
		text-decoration: underline;
	}
</style>