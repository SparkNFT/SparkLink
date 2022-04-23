<template>
	<section id="main-block" :class="{ mobile: !grid.sm, 'not-see': !in_the_view }">
		<div class="container">
			<h2 class="main-text title">Publishing and distribution,</h2>
			<h2 class="main-text title">are redefined by us.</h2>
			<p class="sub-text sub-title">Publish your content, spread your passion</p>
			<p class="sub-text sub-title">Link all creators and sharers together, that is what we doing.</p>
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
import {onMounted, ref, onBeforeMount} from "vue";

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
const in_the_view = ref(false);
const router = useRouter();

onMounted(() => {
	setTimeout(() => {
		in_the_view.value = true;
	}, 1000);

	window.addEventListener("resize", () => {
		calculateStyle();
	})
});

const padding_top = ref("272px");
const height = ref("1034px");

onBeforeMount(() => {
	calculateStyle();
})

function calculateStyle() {
	height.value = window.document.body.clientWidth / (1920 / 1142) - 108 + "px";
	if (window.document.body.clientWidth < 1600) {
		padding_top.value = window.document.body.clientWidth / 1920 * 200 - 100 + "px";
	} else {
		padding_top.value = window.document.body.clientWidth / 1920 * 200 + "px";
	}
}

</script>

<style lang="scss" scoped>
#main-block {
	overflow: hidden;
	position: relative;
	height: v-bind("height");

	.container {
		text-align: center;
		padding-top: v-bind("padding_top");
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

			&:hover {
				background: #FFE177;
				filter: drop-shadow(0px 0px 28px #FFE177);
			}
		}

		.learn-more {
			font-size: 24px;
			color: #ffffff;
			text-decoration: underline;
		}
	}

}

.title {
	transition: all 0.5s ease-in-out;
}

.sub-title {
	transition: all 1s ease-in-out;
}

.publish-btn {
	transition: all 1.5s ease-in-out;
}

.learn-more {
	transition: all 1.5s ease-in;
}

.not-see {
	.title,
	.sub-title,
	.publish-btn,
	.learn-more {
		transform: translateY(100px);
		opacity: 0;
	}
}
</style>
