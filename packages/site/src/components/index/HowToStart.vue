<template>
	<section class="how-to-start">
		<h1 class="title">Simple to start</h1>
		<h5 class="sub-title">No need middlemen, publish and spread becomes in seconds.</h5>
		<div class="card-container">
			<div class="card">
				<img src="/images/credit-card.png" class="head" />
				<div class="title-container">
					<h5 class="title">
						Set up your wallet
					</h5>
				</div>
				<p class="info">
					Once you've set up your wallet
				</p>
				<p class="info">
					ofchoice, connect it to EnftyMart by
				</p>
				<p class="info">
					clicking the
				</p>
			</div>
			<div class="card">
				<img src="/images/file-new.png" class="head"/>
				<div class="title-container">
					<h5 class="title">
						Publish your content
					</h5>
				</div>
				<p class="info">
					Upload your work(image, video,
				</p>
				<p class="info">
					audio, or 3Dart), add a title and
				</p>
				<p class="info">
					description
				</p>
			</div>
			<div class="card">
				<img src="/images/cloud-up.png" class="head"/>
				<div class="title-container">
					<h5 class="title">
						Generate share
					</h5>
					<h5 class="title">
						posters or links
					</h5>
				</div>
				<p class="info">
					Generate exclusive sharing posters
				</p>
				<p class="info">
					and links of NFT works, share and
				</p>
				<p class="info">
					sell freely
				</p>
			</div>
			<div class="card">
				<img src="/images/transfer.png" class="head"/>
				<div class="title-container">
					<h5 class="title">
						Distribute works to
					</h5>
					<h5 class="title">
						obtain revenue
					</h5>
				</div>
				<p class="info">
					Creators get node income permanently
				</p>
				<p class="info">
					by sharing and selling the subordinate
				</p>
				<p class="info">
					nodes of their own works, and sharers
				</p>
				<p class="info">
					get the income permanently by sharing
				</p>
				<p class="info">
					and selling the subordinate nodes of
				</p>
				<p class="info">
					their existing works.
				</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
	.how-to-start {
		text-align: center;
		height: 1102rem;
		padding: 166rem 0 169rem 0;
		box-sizing: border-box;

		.title-container {
			height: 120rem;
		}

		.title {
			margin: 0;
			font-size: 48rem;
			font-weight: 800;
			line-height: 48rem;
			text-align: center;
		}

		.sub-title {
			margin: 29rem 0 0;
			font-size: 22rem;
			font-weight: 400;
			line-height: 40rem;
			text-align: center;
		}

		.card-container {
			margin: 120rem auto 0;
			width: 1683rem;
			display: flex;
			justify-content: space-between;

			.card {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 400rem;
				height: 531rem;
				padding: 50rem 0;
				border-radius: 20rem;
				border: 1rem solid #f3f3f3;
				box-shadow: 20rem 20rem 20rem #f5f5f5;

				.head {
					width: 61rem;
					margin-bottom: 40rem;
				}

				.title {
					color: #2c2f30;
					font-size: 32rem;
					font-weight: 700;
					line-height: 39rem;
				}


				.info {
					margin: 0;
					color: #8d8d97;
					font-size: 20rem;
					font-weight: 400;
					line-height: 36rem;
				}
			}
		}
	}
</style>