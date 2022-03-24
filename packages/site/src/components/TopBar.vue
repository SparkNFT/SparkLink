<template>
	<el-header class="header">
		<el-image src="/images/logo.png" class="logo"></el-image>
		<div class="nav">
			<router-link v-for="item in navs" :key="item.name" :to="item.path">
				{{ item.name }}
			</router-link>
		</div>
		<div class="end">
			<el-button type="text" class="lang-btn">language</el-button>
			<el-tooltip v-if="metaMask.state.account">
				<template #content>
					Address: {{ metaMask.state.account }} <br /><br />
					Click to disconnected.
				</template>
				<el-button type="text" class="connected-info" @click="disconnect">
					Connected
				</el-button>
			</el-tooltip>
			<span v-else-if="metaMask.state.canConnect">Connecting...</span>
			<button
				v-else
				type="primary"
				:disabled="!metaMask.state.hasProvider"
				class="connect-btn"
				@click="connect"
			>
				CONNECT WALLET
			</button>
		</div>
	</el-header>
</template>

<script lang="ts" setup>
	import {
		metaMask,
		ensureConnect,
		disconnect as metaMaskDisconnect,
	} from "../metaMask";

	const navs = [
		{
			name: "HOME",
			path: "/",
		},
		{
			name: "PUBLISH",
			path: "/publish",
		},
		{
			name: "COLLECTION",
			path: "/collection",
		},
		{
			name: "WIKI",
			path: "/wiki",
		},
		{
			name: "MARKET",
			path: "/market",
		},
	] as { name: string; path: string }[];

	function connect() {
		ensureConnect();
	}

	function disconnect() {
		metaMaskDisconnect();
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		height: 108rem;
		align-items: center;
		justify-content: space-between;
		padding: 0 113rem;
	}

	.logo {
		width: 193rem;
	}

	.nav {
		display: flex;
		width: 450rem;
		height: 100%;
		align-items: center;
		justify-content: space-between;
		padding-left: 250rem;

		a {
			text-decoration: none;
			color: #f5f5f5;
			font-size: 18rem;
			font-weight: bold;
		}

		a.router-link-exact-active {
			color: #ffea07;
		}
	}

	.end {
		display: flex;
		align-items: center;
	}

	.lang-btn {
		color: #f5f5f5;
		font-size: 18rem;
		font-weight: bold;
		margin-right: 40rem;
	}

	.connected-info {
		color: var(--el-text-color-primary);
	}

	.connect-btn {
		font-size: 20rem;
		font-weight: bold;
		color: #ff6e65;
		width: 283rem;
		height: 70rem;
		border-radius: 15rem;
		border: none;
		background: linear-gradient(to bottom, rgba(255, 225, 119, 1), rgba(255, 225, 119, 0));
		cursor: pointer;
	}
</style>
