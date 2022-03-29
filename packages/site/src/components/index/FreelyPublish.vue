<template>
	<section class="freely-publish">
		<el-row>
			<el-col :span="12">
				<div class="description">
					<h1 class="title">
						Freely publish what you love
					</h1>
					<p class="text" style="margin-bottom: 16rem">
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
			width: 710rem;
			height: 332rem;
			padding: 187rem 56rem 222rem 194rem;

			.title {
				color: #383838;
				font-family: Inter;
				font-size: 48rem;
				font-weight: 800;
				line-height: 48rem;
				margin: 0 0 52rem;
			}

			.text {
				margin: 0;
				color: #8d8d97;
				font-family: Inter;
				font-size: 25rem;
				font-weight: 400;
				line-height: 25rem;
			}
		}

		.types {
			width: 604rem;
			height: 414rem;
			margin: 115rem 245rem 212rem 111rem;
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
					padding: 14rem 0 17rem 0;
					box-sizing: border-box;
					text-align: center;

					.head {
						width: 46rem;
					}

					.info {
						margin: 16rem 0 0 0;
						color: #2C2F30;
						font-family: Inter;
						font-weight: 700;
						font-size: 15rem;
						line-height: 18rem;
					}
				}
			}

		}
	}

	.start-to-publish {
		width: 319rem;
		height: 82rem;
		margin-top: 84rem;
		color: #ef7a61;
		border: 1rem solid #ef7a61;
		border-radius: 15rem;
		font-family: Inter;
		font-size: 30rem;
		font-weight: 700;
		text-align: center;
		background-color: white;
		cursor: pointer;
	}
</style>