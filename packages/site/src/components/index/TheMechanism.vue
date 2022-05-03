<template>
<section id="mechanism" :class="{ 'not-see': !in_the_view }">
	<div class="container">
		<div class="description">
			<h2 class="how-we-work">{{ t("title") }}</h2>
			<p class="sub-title" style="margin-bottom: 16px">
				{{t("description._1")}}
			</p>
			<p class="sub-title">
				{{t("description._2")}}
			</p>
			<button id="home-start-publish" class="start-to-publish">
				{{t("start_to_publish")}}
			</button>
		</div>
		<div class="space"></div>
		<div class="types">
			<div class="row">
				<div class="item">
					<img src="/assets/mechanism/file.png" class="head"/>
					<p class="info">{{t("items.art_works")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/edit-pencil-line.png" class="head"/>
					<p class="info">{{t("items.illustration")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/book-open.png" class="head"/>
					<p class="info">{{t("items.books")}}</p>
				</div>
			</div>
			<div class="row">
				<div class="item">
					<img src="/assets/mechanism/leaf.png" class="head"/>
					<p class="info">{{t("items.nature")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/command.png" class="head"/>
					<p class="info">{{t("items.3d_art")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/building.png" class="head"/>
					<p class="info">{{t("items.3d_modeling")}}</p>
				</div>
			</div>
			<div class="row">
				<div class="item">
					<img src="/assets/mechanism/head-phones.png" class="head"/>
					<p class="info">{{t("items.music")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/camera.png" class="head"/>
					<p class="info">{{t("items.discovery")}}</p>
				</div>
				<div class="item">
					<img src="/assets/mechanism/alt.png" class="head"/>
					<p class="info">{{t("items.animation")}}</p>
				</div>
			</div>
		</div>
		<div class="space"></div>
	</div>
</section>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";

const {t} = useI18n({
	messages: {
		en: {
			title: "Freely publish what you love",
			description: {
				_1: "No restrictions on the format and content of the publication,",
				_2: "everything is stored permanently distributed in NFT."
			},
			start_to_publish: "Start to publish",
			items: {
				art_works: "Art Works",
				illustration: "Illustration",
				books: "Books",
				nature: "Nature",
				"3d_art": "3D Art",
				"3d_modeling": "3D Modeling",
				music: "Music",
				discovery: "Discovery",
				animation: "Animation"
			}
		},
		"zh-CN": {
			title: "Freely publish what you love",
		},
	},
});

const in_the_view = ref(false);

onMounted(() => {
	let view_point_height = window.innerHeight;
	const element = document.getElementById("mechanism");
	if (!element) throw new Error("element is null");
	const element_top_distance = element.offsetTop;

	window.addEventListener("resize", () => {
		view_point_height = window.innerHeight;
	});

	let view_scroll_top = document.documentElement.scrollTop;

	window.addEventListener("scroll", () => {
		view_scroll_top = document.documentElement.scrollTop;
		if (view_scroll_top + view_point_height > element_top_distance + 600) {
			in_the_view.value = true;
		} else {
			in_the_view.value = false;
		}
	});
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#mechanism {
	width: 100%;
	padding-top: 101px;
	height: 741px;
	box-sizing: border-box;

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.description,
	.types {
		height: 100%;
	}

	.description {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 60%;

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
		width: 40%;
		max-width: 604px;
		height: 414px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-right: 50px;
		box-sizing: border-box;

		.row {
			width: 100%;
			height: 110px;
			display: flex;
			justify-content: space-between;

			.item {
				width: 110px;
				height: 110px;
				border-radius: 10px;
				box-shadow: 0 2px 20px 0 #ef7a6140;
				padding: 14px 0 17px 0;
				box-sizing: border-box;
				text-align: center;
				background-color: white;

				&:hover {
					background: #ffffff;
					box-shadow: 0 3px 40px rgba(232, 68, 33, 0.55);
				}

				.head {
					width: 46px;
				}

				.info {
					margin: 16px 0 0 0;
					color: #2c2f30;
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
		transition: all 0.5s ease-in-out;

		&:hover {
			color: white;
			background-color: #ef7a61;
		}
	}
}

#mechanism.not-see {
	.start-to-publish {
		transform: translateY(100px);
	}
}
</style>
