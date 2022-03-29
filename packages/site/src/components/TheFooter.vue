<template>
	<footer>
		<section class="item description">
			<img src="/images/color-logo.png" class="logo">
			<p class="description-text">
				Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc quam ac sed turpis volutpat.
				Cursus sed massa non nisi, placerat.
			</p>
		</section>

		<section class="item navigation">
			<h5 class="title">NAVIGATION</h5>
			<router-link v-for="item in navs" :key="item.name" :to="item.path">
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
	</footer>
</template>

<script lang="ts" setup>
	import {ref} from "vue";

	const navs = [{
		name: "Home",
		path: "/",
	}, {
		name: "Publish",
		path: "/publish",
	}, {
		name: "Collection",
		path: "/collection",
	}, {
		name: "Wiki",
		path: "/wiki",
	}] as { name: string; path: string }[];

	let email = ref("");
</script>

<style scoped lang="scss">
	footer {
		height: 559rem;
		background: linear-gradient(203.56deg, rgba(255, 255, 255, 0.2) 14.77%, rgba(255, 248, 235, 0.18125) 21.72%, rgba(0, 0, 0, 0) 80.72%),
		linear-gradient(230.61deg, #FECC80 1.01%, #F77878 27.21%, #56557E 87.73%);
		position: relative;
		box-sizing: border-box;
	}

	.item {
		position: absolute;
		top: 94rem;
		width: 310rem;

		&.description {
			left: 118rem;
			height: 284rem;

			.logo {
				width: 165rem;
				height: 38rem;
			}

			.description-text {
				margin: 30rem 0 0 0;
				color: white;
				font-family: Inter;
				font-size: 20rem;
				font-style: normal;
				font-weight: 400;
				line-height: 30rem;
				text-align: left;
			}
		}

		&.navigation {
			left: 935rem;
		}

		&.resources {
			left: 1260rem;
		}

		&.market {
			left: 1584rem;
		}

		.title {
			margin: 0 0 40rem 0;
			color: #ffea07;
			font-family: Inter;
			font-size: 28rem;
			font-weight: 800;
			line-height: 30rem;
			text-align: left;
		}

		a {
			display: block;
			margin: 0 0 30rem 0;
			color: white;
			font-family: Inter;
			font-size: 20rem;
			font-weight: 600;
			line-height: 24rem;
			text-align: left;
			text-decoration: none;

		}
	}

	.email-container {
		position: absolute;
		width: 547rem;
		height: 82rem;
		bottom: 134rem;
		right: 118rem;

		::v-deep(.el-input) {
			height: 100%;
		}

		::v-deep(.el-input__inner) {
			height: 100%;
			border-radius: 15rem;
			padding: 22rem 42rem;
			font-size: 24rem;
		}

		.send {
			position: absolute;
			width: 153rem;
			height: 73rem;
			background: #ef7a61;
			right: 7rem;
			bottom: 4rem;
			font-family: Inter;
			border-radius: 15rem;
			font-size: 24px;
			font-style: normal;
			font-weight: 700;
			line-height: 29rem;
			text-align: center;
		}
	}

	.right {
		position: absolute;
		bottom: 26rem;
		left: 165rem;
		color: #d9dbe1;
		font-family: Inter;
		font-size: 14rem;
		font-weight: 400;
		line-height: 24rem;
		text-align: left;
	}
</style>