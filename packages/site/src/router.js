import {createRouter, createWebHashHistory} from "vue-router";
import Layout from "./routes/__layout.vue";
import Index from "./routes/Index.vue";
import Publish from "./routes/Publish.vue";
import Collection from "./routes/Collection.vue";

const routes = [
	{
		path: "/",
		component: Layout,
		children: [
			{
				path: "",
				component: Index,
			},
			{
				path: "publish",
				component: Publish,
			},
			{
				path: "collection",
				component: Collection
			},
			{
				path: "wiki",
				component: Index,
				beforeEnter() {
					window.location.replace("https://docs.sparklink.io/");
					return false;
				},
			},
		],
	},
];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
