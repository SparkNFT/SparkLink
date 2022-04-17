<template>
	<section id="main-block" :class="{ mobile: !grid.sm }">
		<div class="container">
			<h2 class="main-text">Publishing and distribution,</h2>
			<h2 class="main-text">are redefined by us.</h2>
			<p class="sub-text">Publish your content, spread your passion</p>
			<p class="sub-text">Link all creators and sharers together, that is what we doing.</p>
			<router-link :to="{ name: `publish` }">
				<el-button color="#478EFD" class="btn primary publish-btn">
					<span class="btn-text">{{ t("publish") }}</span>
				</el-button>
			</router-link>
			<br>
			<router-link :to="{ name: `wiki` }" class="sub-text learn-more">
				{{ t("learnMore") }}
			</router-link>
		</div>
	</section>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {grid} from "../../grid";

const {t} = useI18n({
	messages: {
		en: {
			publish: "Publish",
			learnMore: "Learn More",
		},
		"zh-CN": {
			publish: "发布",
			learnMore: "了解更多"
		}
	},
});

const router = useRouter();
</script>

<style lang="scss" scoped>
#main-block {
	overflow: hidden;
	position: relative;
	height: 1034px;

	.container {
		text-align: center;
		padding-top: 272px;
		box-sizing: border-box;
		height: 100%;

		.main-text {
			margin: 0 0 50px;
			color: #f5f5f5;
			font-weight: bolder;
			font-size: 58px;
			line-height: 100%;
		}

		#main-block:first-child .main-text {
			margin-bottom: 38px;
		}

		.sub-text {
			margin: 0;
			color: #f5f5f5;
			font-size: 24px;
			line-height: 100%;
		}

		&:first-child .sub-text {
			margin-bottom: 10px;
		}

		.publish-btn {
			width: 308px;
			height: 82px;
			margin-top: 150px;
			margin-bottom: 75px;
			border-radius: 15px;
			border: none;
			background: linear-gradient(77.37deg, #FC5151 3.37%, #FFE177 55.28%, #FFA370 99.2%);

			:deep(span) {
				color: #ff6830;
				font-size: 30px;
				font-weight: bold;
			}
		}

		.learn-more {
			font-size: 24px;
			color: #ffffff;
			text-decoration: underline;
		}
	}

}
</style>
