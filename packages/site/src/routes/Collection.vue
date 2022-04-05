<template>
	<div class="collection-border">
		<h1 class="title">
			{{ t("collection") }}
		</h1>

		<template v-if="nftIds.length > 0 && fetch">
			<div class="container">
				<ArtCardWrapper
					v-for="id in nftIds"
					:key="id"
					:nft-id="id"
					:info-getter="nftInformationGetter"
				></ArtCardWrapper>
			</div>

			<div v-for="(_, index) in placers" :key="index" class="placer"/>
		</template>
		<template v-else-if="nftIds.length === 0 && fetch">
			<p class="material-icons-outlined nothing icon">inbox</p>
			<p class="nothing description">{{ t("noNft") }}</p>
			<div class="nothing btn-area">
				<el-button type="primary" :class="{ mobile: !grid.sm }" @click="router.push({name: 'publish'})">{{
						t("btn.publish")
					}}
				</el-button>
			</div>
		</template>
		<template v-else-if="!account">
			<p class="nothing description">
				{{ t("noAccount") }}
			</p>
		</template>
	</div>
</template>

<script lang="ts" setup>
import type {UserOperatorFactory} from "@SparkLink/business";
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import ArtCardWrapper from "../components/collection/ArtCardWrapper.vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {grid} from "../grid";
import {web3InfoGetter} from "../store";

const {t} = useI18n({
	messages: {
		en: {
			noNft: "There is no NFT to display for the time being",
			noAccount: "Please connect your wallet first.",
			collection: "Collection",
			btn: {publish: "To publish"},
		},
		"zh-CN": {
			noNft: "目前暂无可展示的作品",
			noAccount: "请先连接你的钱包",
			collection: "你的收藏",
			btn: {publish: "去发布"},
		},
	},
});

const router = useRouter();

const store = useStore();
const factory = computed(
	() => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const client = computed(() => factory.value?.keyServerClient);
const nftInformationGetter = computed(() => factory.value.nftInformationGetter);
const chainName = computed(() => web3InfoGetter.chain.name.value);
const account = computed(() => store.state.web3.account as string);
const nftIds = ref([] as string[]);
const fetch = ref(false);
const placers = computed(() => {
	const nftIdsNum = nftIds.value?.length ?? 0;
	return [1].reduce((arr, v) => {
		for (let i = 0; i < 4 - nftIdsNum; i++) arr.push(v);
		return arr;
	}, [] as number[]);
});

async function resetPage() {
	fetch.value = false;
	console.log(client.value, chainName.value, account.value)
	if (client.value && chainName.value && account.value) {
		nftIds.value = await client.value.retrieveNftIds({
			chain: chainName.value as string,
			owner: account.value,
		});
		fetch.value = true;
		return;
	}
}

watch(client, resetPage);
onMounted(resetPage);

const unsupportedChain = computed(() => !chainName.value);
</script>

<style lang="scss" scoped>
.collection-border {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 140px 150px 175px 150px;
	box-sizing: border-box;

	.title {
		margin: 0 0 77px;
		font-size: 48px;
		font-weight: 900;
		line-height: 48px;
		text-align: center;
		color: #383838;
	}
}

.container {
	display: grid;
	flex: 1;
	grid-template-columns: repeat(auto-fit, 489px);
	justify-content: center;
	gap: 68px;
}

.nothing {
	text-align: center;
	margin-block: unset;
	margin-bottom: 20px;

	&.icon {
		font-size: 80px;
		color: var(--el-text-color-secondary);
	}

	&.btn-area {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	& button.mobile {
		flex: 1;
	}
}
</style>
