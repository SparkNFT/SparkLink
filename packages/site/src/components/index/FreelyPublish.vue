<template>
	<section class="freely-publish">
		<el-row>
			<el-col :span="12">
				<div class="description">
					<h1 class="title">
						Freely publish what you love
					</h1>
					<p class="text">
						No restrictions on the format and content of the publication,
					</p>
					<p class="text">
						everything is stored permanently distributed in NFT.
					</p>
					<button class="start-to-publish">
						Start to publish
					</button>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="types">
					<div class="row">
						<div class="item">
							<img src="/images/file.png" class="head">
							<p class="info">
								Art Works
							</p>
						</div>
						<div class="item">
							<img src="/images/edit-pencil-line.png" class="head">
							<p class="info">
								Illustration
							</p>
						</div>
						<div class="item">
							<img src="/images/book-open.png" class="head">
							<p class="info">
								Books
							</p>
						</div>
					</div>
					<div class="row">
						<div class="item">
							<img src="/images/leaf.png" class="head">
							<p class="info">
								Nature
							</p>
						</div>
						<div class="item">
							<img src="/images/command.png" class="head">
							<p class="info">
								3D Art
							</p>
						</div>
						<div class="item">
							<img src="/images/building.png" class="head">
							<p class="info">
								3D Modeling
							</p>
						</div>
					</div>
					<div class="row">
						<div class="item">
							<img src="/images/head-phones.png" class="head">
							<p class="info">
								Music
							</p>
						</div>
						<div class="item">
							<img src="/images/camera.png" class="head">
							<p class="info">
								Discovery
							</p>
						</div>
						<div class="item">
							<img src="/images/alt.png" class="head">
							<p class="info">
								Animation
							</p>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
	.freely-publish {
		height: 741rem;
		box-sizing: border-box;

		.el-row,
		.description,
		.types {
			height: 100%;
		}

		.description {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 90rem 0;

			.title {
				color: #383838;
				font-size: 46rem;
				font-weight: 800;
				line-height: 48rem;
			}

			.text {
				margin: 10rem;
				color: #8d8d97;
				font-size: 25rem;
				font-weight: 400;
				line-height: 25rem;
			}
		}

		.types {
			width: 604rem;
			height: 414rem;
			margin: 0 auto;
			padding-top: 100rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.row {
				width: 100%;
				height: 110rem;
				display: flex;
				justify-content: space-between;

				.item {
					width: 110rem;
					height: 110rem;
					border-radius: 10rem;
					box-shadow: 0 2rem 20rem 0 #EF7A6140;
					padding: 17rem;
					box-sizing: border-box;
					text-align: center;

					.head {
						width: 45rem;
					}

					.info {
						margin: 12rem 0;
						color: #2C2F30;
						font-weight: 700;
						font-size: 15rem;
						line-height: 18rem;
					}
				}
			}

		}
	}

	.start-to-publish {
		margin-top: 80rem;
		padding: 25rem 46rem;
		color: #ef7a61;
		border: 1rem solid #ef7a61;
		border-radius: 15rem;
		font-size: 30rem;
		font-weight: 700;
		line-height: 33rem;
		text-align: center;
		background-color: white;
		cursor: pointer;
	}
</style>