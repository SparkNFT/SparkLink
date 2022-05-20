import { computed } from "@vue/reactivity";
import { grid } from "../grid";

export const index = {
  blocksHaveBackground: computed(() => grid.xl),
};

export const collection = {
  inMobile: computed(() => !grid.md),
};

export const art = {
  inMobile: computed(() => !grid.md),
};
