<template>
	<div class="form-container">
		<div class="divider" />
		<Title>Publish Art</Title>
		<div class="divider" />
		<PublishForm />
		<div class="divider" />
	</div>
</template>

<script lang="ts" setup>
	import Title from "../components/Title.vue";
	import PublishForm from "../components/publish/PublishForm.vue";
</script>

<style lang="scss" scoped>
	.divider {
		height: 24px;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		max-width: 1050px;
		margin: auto;
	}
</style>
