import { createRouter, createWebHashHistory, useRouter } from "vue-router";
import Layout from "./routes/__layout.vue";
import Index from "./routes/Index.vue";
import Publish from "./routes/Publish.vue";
import Collection from "./routes/Collection.vue";
import ArtPage from "./routes/ArtPage.vue";
import Market from "./routes/Market.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "index",
        path: "",
        component: Index,
      },
      {
        name: "publish",
        path: "publish",
        component: Publish,
      },
      {
        name: "wiki",
        path: "wiki",
        component: Index,
        beforeEnter() {
          window.location.replace("https://docs.sparklink.io/");
          return false;
        },
      },
      {
        name: "collection",
        path: "collection",
        component: Collection,
      },
      {
        name: "art",
        path: "arts/:chainId/:nftId",
        component: ArtPage,
      },
      {
        name: "market",
        path: "market",
        component: Market,
      },
    ],
  },
];

const debugRoutes = [
  {
    path: "/debug/topbar/navigation-drawer",
    component: () => import("./componentsViews/topbar/NavigationDrawer.vue"),
  },
  {
    path: "/debug/topbar/switch-network-dialog",
    component: () => import("./componentsViews/topbar/SwitchNetworkDialog.vue"),
  },
  {
    path: "/debug/dialog",
    component: () => import("./componentsViews/Dialog.vue"),
  },
  {
    path: "/debug/art/canvas",
    component: () => import("./componentsViews/art/Canvas.vue"),
  },
  {
    path: "/debug/topbar/switch-language",
    component: () => import("./componentsViews/topbar/SwitchLanguage.vue")
  }
];

if (process.env?.DEBUG) {
  // @ts-ignore
  routes.push(...debugRoutes);
}

const router = createRouter({ history: createWebHashHistory(), routes });

export default router;

export function useNavTo(toFalse: () => void) {
  const router = useRouter();
  return (path: string) => {
    router.push(path);
    toFalse();
  };
}
