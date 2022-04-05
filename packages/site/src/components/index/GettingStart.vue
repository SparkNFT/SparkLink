<template>
	<section id="getting-start">
		<div class="getting-start-inner">
			<h2 class="how-to-start">{{ t("title") }}</h2>
			<h5 class="sub-title">No need middlemen, publish and spread becomes in seconds.</h5>
			<div class="card-container">
				<GettingStartCard
					v-for="(step, index) in steps"
					:key="index"
					:icon-url="step.iconUrl"
					:title="step.title"
					:description="step.description"
				></GettingStartCard>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import {computed} from "vue";
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
					title: "Distribute works to obtain revenue",
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
}

function createStepMapper(baseUrl: string) {
	return function (
		value: { title: string; description: string },
		index: number
	) {
		return {
			iconUrl: `${baseUrl}/step-${index + 1}.png`,
			title: value.title,
			description: value.description,
		} as IStep;
	};
}

const stepSvgBaseUrl = "assets/getting-start";

const steps = computed(() => [0, 1, 2, 3]
	.map((i) => ({
		title: t(`steps[${i}].title`),
		description: t(`steps[${i}].description`),
	}))
	.map(createStepMapper(`${stepSvgBaseUrl}`)) as IStep[]);
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
</style>
