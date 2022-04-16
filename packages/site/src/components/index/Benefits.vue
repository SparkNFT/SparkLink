<template>
	<section id="benefits">
		<div class="container">
			<img src="/assets/how-to-benefit/nodes.png"  class="nodes" />
			<div class="web3">
				<h1 class="title">
					Pure Web3 creator economy,
				</h1>
				<h1 class="title">
					We are So different from others
				</h1>

				<p class="text">
					unique tree-shaped sharing economy structure
				</p>
				<p class="text">
					allows everyone to share and sell node NFT
				</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({
	messages: {
		en: {},
		"zh-CN": {},
	},
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#benefits {
	height: 863px;
	box-sizing: border-box;

	.container {
		position: relative;
		max-width: 1920px;
		margin: 0 auto;
		width: 100%;
	}

	.nodes {
		position: absolute;
		top: 198px;
		left: 118px;
		width: 945px;
	}

	.web3 {
		position: absolute;
		top: 288px;
		left: 1106px;

		.title {
			margin: 34px 0 56px;
			color: #383838;
			font-size: 45px;
			font-style: normal;
			font-weight: 800;
			line-height: 45px;
			text-align: center;
			@include index.title-underline
		}

		.text {
			color: #8D8D97;
			font-size: 25px;
			font-style: normal;
			font-weight: 400;
			line-height: 25px;
			text-align: center;
		}
	}
}
</style>
