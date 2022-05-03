<template>
<el-footer id="footer">
	<div class="item-container">
		<div class="description">
			<section class="item">
				<img src="/assets/color-logo.png" class="logo"/>
				<p class="description-text">
					{{t("description")}}
				</p>
				<p
					v-for="share in shareLinks"
					:key="share.target"
					class="share"
					@click="openShareTarget(share.target)"
				>
					<i :class="share.icon"/>
				</p>
			</section>
		</div>
		<div class="others">
			<section class="item">
				<h5 class="title">{{t("items.navigation")}}</h5>
				<router-link
					v-for="item in navs"
					:key="item.name"
					:to="{ name: item.routeName }"
				>
					{{ item.name }}
				</router-link>
			</section>
			<section class="item">
				<h5 class="title">{{t("items.resources")}}</h5>
				<a>{{t("items.conditions")}}</a>
				<a>{{t("items.privacy_policy")}}</a>
				<a>{{t("items.people")}}</a>
			</section>
			<section class="item">
				<h5 class="title">{{t("items.market")}}</h5>
				<a>{{t("items.open_sea")}}</a>
			</section>
		</div>
	</div>
	<div class="email-container">
		<el-input v-model="email" placeholder="info@sparklink.io"/>
		<el-button type="warning" class="send" @click="handleMailAddressClick"
		>
			{{t("contact_us")}}
		</el-button
		>
	</div>
	<p class="rights">{{t("rights")}}</p>
</el-footer>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, ref, reactive} from "vue";
import {ElMessage} from "element-plus";

const {t} = useI18n({
	messages: {
		en: {
			description: "Unique content publishing and distribution protocol",
			items: {
				navigation: "NAVIGATION",
				resources: "RESOURCES",
				conditions: "Conditions",
				privacy_policy: "Privacy Policy",
				people: "People",
				open_sea: "OpenSea",
				market: "MARKET"
			},
			contact_us: "CONTACT US",
			copy_email_address_success: "copy email address success",
			rights: "© 2020 Landify UI Kit. All rights reserved"
		},
		"zh-CN": {
			copy_email_address_success: "邮箱地址复制成功",
		},
	},
});

interface INav {
	name: string;
	routeName: string;
}

const navs = computed(
	() =>
		[
			{name: t("navs.home"), routeName: "index"},
			{name: t("navs.publish"), routeName: "publish"},
			{name: t("navs.collection"), routeName: "collection"},
			{name: t("wiki"), routeName: "wiki"},
		] as INav[]
);

let email = ref("");

const shareLinks = reactive([
	{
		target: "https://t.co/xM7bzslqZ8",
		icon: "iconfont icon-discord",
	},
	{
		target: "https://t.co/Ngpm0LKQDP",
		icon: "iconfont icon-telegram",
	},
	{
		target: "https://medium.com/@SparkLink",
		icon: "iconfont icon-medium",
	},
	{
		target: "https://twitter.com/SparkLink_io",
		icon: "iconfont icon-twitter",
	},
]);

function openShareTarget(e: string) {
	window.open(e);
}

function handleMailAddressClick() {
	navigator.clipboard.writeText("info@sparklink.io").then(() => {
		ElMessage({type: "success", message: t("copy_email_address_success")});
	});
}
</script>

<style lang="scss" scoped>
#footer {
	position: relative;
	height: 559px;
	background: linear-gradient(
			203.56deg,
			rgba(255, 255, 255, 0.2) 14.77%,
			rgba(255, 248, 235, 0.18125) 21.72%,
			rgba(0, 0, 0, 0) 80.72%
	),
	linear-gradient(230.61deg, #fecc80 1.01%, #f77878 27.21%, #56557e 87.73%);
	box-sizing: border-box;

	.item-container {
		margin-top: 94px;
		margin-left: 118px;
		display: flex;
		justify-content: space-between;

		.description {
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
				display: inline-block;
				margin: 0 23px 0 0;
				width: 32px;
				height: 32px;
				color: #666;
				cursor: pointer;
				border-radius: 16px;
				border: none;
				background-color: white;
				text-align: center;

				&:hover {
					background-color: #ffea07;
				}

				i {
					line-height: 32px;
				}
			}

			button + button {
				margin-left: 24px;
			}
		}

		.others {
			display: flex;
			justify-content: space-between;
		}

		.title {
			margin: 0 0 40px 0;
			color: #ffea07;
			font-size: 28px;
			font-weight: 800;
			line-height: 30px;
			text-align: left;
		}

		.item {
			max-width: 310px;
			min-width: 250px;

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
				color: #ff6e65;
				background: #ffea07;
				border-color: #ffea07;
			}
		}
	}

	.rights {
		position: absolute;
		bottom: 26px;
		left: 165px;
		color: #d9dbe1;
		font-size: 14px;
		font-weight: 400;
		line-height: 24px;
		text-align: left;
	}
}
</style>
