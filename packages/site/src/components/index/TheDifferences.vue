<template>
	<section class="differences">
		<img src="/images/nodes.png"  class="nodes" />
		<div class="web3">
			<h1 class="title">
				Pure Web3 creator economy,
			</h1>
			<h1 class="title" style="margin-bottom: 56rem; margin-top: 34rem">
				We are So different from others
			</h1>

			<p class="text">
				unique tree-shaped sharing economy structure
			</p>
			<p class="text">
				allows everyone to share and sell node NFT
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
	.differences {
		position: relative;
		height: 863rem;
		background: #F4EBEB;
		box-sizing: border-box;

		.nodes {
			position: absolute;
			top: 198rem;
			left: 118rem;
			width: 945rem;
		}

		.web3 {
			position: absolute;
			top: 288rem;
			left: 1106rem;

			.title {
				margin: 0;
				color: #383838;
				font-family: Inter;
				font-size: 45px;
				font-style: normal;
				font-weight: 800;
				line-height: 45px;
				text-align: center;
			}

			.text {
				color: #8D8D97;
				font-family: Inter;
				font-size: 25px;
				font-style: normal;
				font-weight: 400;
				line-height: 25px;
				text-align: center;
			}
		}
	}
</style>