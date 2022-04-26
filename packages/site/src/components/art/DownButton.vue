<template>
	<button
		class="btn orange download"
		:disabled="!canDownload"
		@click="clickDownloadButton"
	>
		{{ t("download") }}
	</button>
	<download-in-progress
		v-if="downloadInProcess"
		v-model="downloadInProcess"
		:event-emitter="eventEmitter as IContentDownloadEventEmitter"
		:encrypted="encrypted"
		@listeners:attached="download"
	></download-in-progress>
</template>
<script setup lang="ts">
import {useI18n} from "vue-i18n";
import DownloadInProgress from "./DownloadInProgress.vue";
import {DownloadEventEmitter} from "@SparkLink/business";
import type {
	UserOperatorFactory,
	IContentDownloadEventEmitter,
} from "@SparkLink/business";
import type {IContentDownloader} from "@SparkLink/business/generated/src/downloader";
import type {INftInformation} from "@SparkLink/business/generated/src/nftInfomation";
import {computed, watch, ref} from "vue";
import {useStore} from "vuex";

const {t} = useI18n({
	messages: {
		en: {
			download: "DOWNLOAD",
		},
		"zh-CN": {
			download: "下载",
		},
	},
});
const props = defineProps<{
	metadata: INftInformation;
	nftId: string;
}>();


const store = useStore();
const factory = computed(
	() => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const account = computed(() => store.state.web3.account as string);
const isOwner = computed(() => props.metadata.owner.value === account.value);
const downloadInProcess = ref(false);
const eventEmitter = ref(null as DownloadEventEmitter | null);
const downloader = ref(null as IContentDownloader | null);
const canDownload = computed(() => {
	if (!factory.value || !props.metadata) return false;
	const _meta = props.metadata;
	if (!isOwner.value) {
		if (_meta.encrypted === false) return true;
		return false;
	}
	return true;
});
const encrypted = computed(() => props.metadata.encrypted ?? false);

watch(downloadInProcess, (a1, a2) => {
	console.log(a1, a2);
	if (!downloadInProcess.value) {
		resetDownloader();
	}
});

function setDownloader(
	emitter: DownloadEventEmitter,
	_downloader: IContentDownloader
) {
	eventEmitter.value = emitter;
	downloader.value = _downloader;
	downloadInProcess.value = true;
}

function resetDownloader() {
	eventEmitter.value = null;
	downloader.value = null;
}


async function clickDownloadButton() {
	const nftId = props.nftId;
	if (!canDownload.value) return;
	const downloader = await factory.value.getContentDownloader(
		encrypted.value,
		nftId
	);
	const eventEmitter = new DownloadEventEmitter();
	setDownloader(eventEmitter, downloader);
}

function downloadURL(url: string, fileName: string) {
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.style.display = "none";
	a.click();
	a.remove();
}

function downloadBlob(data: Uint8Array, fileName: string) {
	const blob = new Blob([data]);
	const url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
	setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

async function download() {
	const _meta = props.metadata as INftInformation;
	const contentUrl = _meta.urls.content;
	const _downloader = downloader.value as IContentDownloader;
	const _emitter = eventEmitter.value as DownloadEventEmitter;
	const data = await _downloader.download(contentUrl, _emitter);
	downloadBlob(data, `${_meta.name}.zip`);
}
</script>

<style scoped lang="scss">
.btn {
	height: 70px;
	padding: 22px 0;
	cursor: pointer;
	font-size: 24px;
	line-height: 26px;
	font-weight: 700;
	border: none;
	border-radius: 15px;
}

.btn.orange {
	color: white;
	background: #EF7A61;
}

.download {
	width: 364px;
	margin-top: 73px;
}
</style>