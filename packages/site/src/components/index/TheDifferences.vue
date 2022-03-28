<template>
	<section class="differences">
		<el-row>
			<el-col :span="13">
				<div class="nodes">
					<img src="/images/nodes.png" />
				</div>
			</el-col>
			<el-col :span="11">
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
					<p class="text">
						content, generating split positive economic benefits.
					</p>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
	.differences {
		height: 863rem;
		background: #F4EBEB;
		box-sizing: border-box;

		.el-row,
		.nodes,
		.web3 {
			height: 100%;
		}

		.nodes {
			display: flex;
			align-items: center;

			img {
				width: 100%;
			}
		}

		.web3 {
			padding-top: 180rem;

			.title {
				font-style: normal;
				font-weight: 800;
				font-size: 48rem;
				text-align: center;
				color: #383838;
			}

			.text {
				font-weight: 400;
				font-size: 25rem;
				text-align: center;
				color: #8D8D97;
			}
		}
	}
</style>