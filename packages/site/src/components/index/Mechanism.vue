<template>
	<section id="mechanism">
		<el-row>
			<el-col :span="12">
				<div class="description">
					<h2 class="how-we-work">{{ t("title") }}</h2>
					<p class="sub-title" style="margin-bottom: 16px">
						No restrictions on the format and content of the publication,
					</p>
					<p class="sub-title">
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
							<img src="/assets/mechanism/file.png" class="head">
							<p class="info">
								Art Works
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/edit-pencil-line.png" class="head">
							<p class="info">
								Illustration
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/book-open.png" class="head">
							<p class="info">
								Books
							</p>
						</div>
					</div>
					<div class="row">
						<div class="item">
							<img src="/assets/mechanism/leaf.png" class="head">
							<p class="info">
								Nature
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/command.png" class="head">
							<p class="info">
								3D Art
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/building.png" class="head">
							<p class="info">
								3D Modeling
							</p>
						</div>
					</div>
					<div class="row">
						<div class="item">
							<img src="/assets/mechanism/head-phones.png" class="head">
							<p class="info">
								Music
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/camera.png" class="head">
							<p class="info">
								Discovery
							</p>
						</div>
						<div class="item">
							<img src="/assets/mechanism/alt.png" class="head">
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
import {useI18n} from "vue-i18n";

const {t} = useI18n({
	messages: {
		en: {
			title: "Freely publish what you love",
		},
		"zh-CN": {},
	},
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#mechanism {
	max-width: 1920px;
	margin: 0 auto;
	height: 741px;
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
		width: 710px;
		height: 332px;
		padding: 187px 56px 222px 194px;

		.how-we-work {
			@include index.index-title;
			margin: 0 0 52px;
		}

		.sub-title {
			margin: 0;
			color: #8d8d97;
			font-size: 25px;
			font-weight: 400;
			line-height: 25px;
		}
	}

	.types {
		width: 604px;
		height: 414px;
		margin: 115px 245px 212px 111px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.row {
			width: 100%;
			height: 110px;
			display: flex;
			justify-content: space-between;

			.item {
				width: 110px;
				height: 110px;
				border-radius: 10px;
				box-shadow: 0 2px 20px 0 #EF7A6140;
				padding: 14px 0 17px 0;
				box-sizing: border-box;
				text-align: center;

				.head {
					width: 46px;
				}

				.info {
					margin: 16px 0 0 0;
					color: #2C2F30;
					font-weight: 700;
					font-size: 15px;
					line-height: 18px;
				}
			}
		}

	}

	.start-to-publish {
		width: 319px;
		height: 82px;
		margin-top: 84px;
		color: #ef7a61;
		border: 1px solid #ef7a61;
		border-radius: 15px;
		font-size: 30px;
		font-weight: 700;
		text-align: center;
		background-color: white;
		cursor: pointer;

		&:hover {
			color: white;
			background-color: #ef7a61;
		}
	}
}
</style>
