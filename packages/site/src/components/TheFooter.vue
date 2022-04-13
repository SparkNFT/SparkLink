<template>
	<el-footer id="footer">
		<section class="item description">
			<img src="/assets/color-logo.png" class="logo">
			<p class="description-text">
				Lopx ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc quam ac sed turpis volutpat.
				Cursus sed massa non nisi, placerat.
			</p>
			<button v-for="share in shareLinks" :key="share.target" class="share"
			        @click="openShareTarget(share.target)">
				<i :class="share.icon" />
			</button>
		</section>

		<section class="item navigation">
			<h5 class="title">NAVIGATION</h5>
			<router-link v-for="item in navs" :key="item.name" :to="{name: item.routeName}">
				{{ item.name }}
			</router-link>
		</section>
		<section class="item resources">
			<h5 class="title">RESOURCES</h5>
			<a>Conditions</a>
			<a>Privacy Policy</a>
			<a>People</a>
		</section>
		<section class="item market">
			<h5 class="title">MARKET</h5>
			<a>Easeshare-Markey</a>
			<a>OpenSea</a>
		</section>
		<div class="email-container">
			<el-input v-model="email" placeholder="info@sparklink.io" />
			<el-button type="warning" class="send">Send</el-button>
		</div>
		<p class="right">
			© 2020 Landify UI Kit. All rights reserved
		</p>

	</el-footer>
</template>

<script lang="ts" setup>
	import {useI18n} from "vue-i18n";
	import {computed, ref, reactive} from "vue";

	const {t} = useI18n({
		messages: {
			en: {},
			"zh-CN": {},
		},
	});

	interface INav {
		name: string;
		routeName: string;
	}

	const navs = computed(() => [
		{name: t("navs.home"), routeName: "index"},
		{name: t("navs.publish"), routeName: "publish"},
		{name: t("navs.collection"), routeName: "collection"},
		{name: t("wiki"), routeName: "wiki"},
	] as INav[]);

	let email = ref("");

	const shareLinks = reactive([{
		target: "https://t.co/xM7bzslqZ8",
		icon: "iconfont icon-discord"
	}, {
		target: "https://t.co/Ngpm0LKQDP",
		icon: "iconfont icon-telegram"
	}, {
		target: "https://medium.com/@SparkLink",
		icon: "iconfont icon-medium"
	}, {
		target: "https://twitter.com/SparkLinkNFT",
		icon: "iconfont icon-twitter"
	}])

	function openShareTarget(e: string) {
		window.open(e)
	}
</script>

<style lang="scss" scoped>
	#footer {
		height: 559px;
		background: linear-gradient(203.56deg, rgba(255, 255, 255, 0.2) 14.77%, rgba(255, 248, 235, 0.18125) 21.72%, rgba(0, 0, 0, 0) 80.72%),
		linear-gradient(230.61deg, #FECC80 1.01%, #F77878 27.21%, #56557E 87.73%);
		position: relative;
		box-sizing: border-box;
	}

	.item {
		position: absolute;
		top: 94px;
		width: 310px;

		&.description {
			left: 118px;
			height: 284px;

			.logo {
				width: 165px;
				height: 38px;
			}

			.description-text {
				margin: 30px 0 30px 0;
				color: white;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: 30px;
				text-align: left;
			}

			.share {
				width: 32px;
				height: 32px;
				color: #666;
				cursor: pointer;
				border-radius: 16px;
				border: none;
			}

			button + button {
				margin-left: 24px;
			}
		}

		&.navigation {
			left: 935px;
		}

		&.resources {
			left: 1260px;
		}

		&.market {
			left: 1584px;
		}

		.title {
			margin: 0 0 40px 0;
			color: #ffea07;
			font-size: 28px;
			font-weight: 800;
			line-height: 30px;
			text-align: left;
		}

		a {
			display: block;
			margin: 0 0 30px 0;
			color: white;
			font-size: 20px;
			font-weight: 600;
			line-height: 24px;
			text-align: left;
			text-decoration: none;

		}
	}

	.email-container {
		position: absolute;
		width: 547px;
		height: 82px;
		bottom: 134px;
		right: 118px;

		::v-deep(.el-input) {
			height: 100%;
		}

		::v-deep(.el-input__inner) {
			height: 100%;
			border-radius: 15px;
			padding: 22px 42px;
			font-size: 24px;
		}

		.send {
			position: absolute;
			width: 153px;
			height: 73px;
			background: #ef7a61;
			right: 7px;
			bottom: 4px;
			border-radius: 15px;
			font-size: 24px;
			font-style: normal;
			font-weight: 700;
			line-height: 29px;
			text-align: center;

			&:hover {
				color: #FF6E65;
				background: #FFEA07;
				border-color: #FFEA07;
			}
		}
	}

	.right {
		position: absolute;
		bottom: 26px;
		left: 165px;
		color: #d9dbe1;
		font-size: 14px;
		font-weight: 400;
		line-height: 24px;
		text-align: left;
	}
</style>
