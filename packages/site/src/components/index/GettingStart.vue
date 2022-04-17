<template>
	<section id="getting-start" :class="{'not-see': !in_the_view}">
		<div class="getting-start-inner">
			<h2 class="how-to-start">{{ t("title") }}</h2>
			<h5 class="sub-title">No need middlemen, publish and spread becomes in seconds.</h5>
			<div id="home-start-card-container" class="card-container">
				<GettingStartCard
					v-for="(step, index) in steps"
					:key="index"
					:icon-url="step.iconUrl"
					:title="step.title"
					:description="step.description"
					:the-class="step.class"
				></GettingStartCard>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import GettingStartCard from "./GettingStartCard.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
	messages: {
		en: {
			title: "Simple to start",
			steps: [
				{
					title: "Set up your wallet",
					description:
						"Connect the crypto wallet to start",
				},
				{
					title: "Publish your content",
					description:
						"Upload your work(image, video, audio, or 3D art)",
				},
				{
					title: "Generate share posters or links",
					description:
						"Generate exclusive sharing posters and links of NFT works, share and sell freely",
				},
				{
					title: "Monetize",
					description:
						"Creators get royalties and  node income permanently by selling the subordinate nodes of their own works, sharers get the income permanently by selling the subordinate nodes of their bought.",
				},
			],
		},
		"zh-CN": {},
	},
});

interface IStep {
	iconUrl: string;
	title: string;
	description: string;
	class: string
}

function createStepMapper(baseUrl: string) {
	return function (
		value: { title: string; description: string; class: string},
		index: number,
	) {
		return {
			iconUrl: `${baseUrl}/step-${index + 1}.png`,
			title: value.title,
			description: value.description,
			class: value.class
		} as IStep;
	};
}

const stepSvgBaseUrl = "assets/getting-start";

const step_class = [
	"_1",
	"_2",
	"_3",
	"_4",
]

const steps = computed(() => [0, 1, 2, 3]
	.map((i) => ({
		title: t(`steps[${i}].title`),
		description: t(`steps[${i}].description`),
		class: step_class[i]
	}))
	.map(createStepMapper(`${stepSvgBaseUrl}`)) as IStep[]);

const in_the_view = ref(false);

onMounted(() => {
	let view_point_height = window.innerHeight;
	const element = document.getElementById("getting-start");
	if (!element) throw new Error("element is null");
	const element_top_distance = element.offsetTop;

	window.addEventListener("resize", () => {
		view_point_height = window.innerHeight;
	})

	let view_scroll_top = document.documentElement.scrollTop;

	window.addEventListener("scroll", () => {
		view_scroll_top = document.documentElement.scrollTop;
		if (view_scroll_top + view_point_height > element_top_distance + 300) {
			in_the_view.value = true;
		} else {
			in_the_view.value = false;
		}
	})
})



</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#getting-start {
	padding: 166px 0 169px 0;
	box-sizing: border-box;
	text-align: center;

	.getting-start-inner {
		.how-to-start {
			@include index.index-title;
		}

		.sub-title {
			margin: 29px 0 0;
			color: #8D8D97;
			font-size: 22px;
			font-weight: 400;
			line-height: 40px;
			text-align: center;
		}

		.card-container {
			margin: 120px auto 0;
			max-width: 1683px;
			display: flex;
			align-items: stretch;
			justify-content: space-between;
		}
	}
}

:deep(._1) {
	transition: all 0.5s ease-in-out;
}
:deep(._2) {
	transition: all 1s ease-in-out;
}
:deep(._3) {
	transition: all 1.5s ease-in-out;
}
:deep(._4) {
	transition: all 2s ease-in-out;
}

.not-see {
	:deep(.card) {
		transform: translateY(550px);
		opacity: 0;
	}
}
</style>
