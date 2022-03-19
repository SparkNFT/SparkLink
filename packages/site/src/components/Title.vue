<template>
	<div class="container">
		<div class="vertical-line" />
		<h1 class="title">
			<slot />
		</h1>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
	.container {
		display: flex;
		align-items: stretch;
	}

	.vertical-line {
		width: 6px;
		background-color: var(--color-secondary);
		margin-right: 1rem;
	}

	.title {
		margin-block: 0.25rem;
	}
</style>