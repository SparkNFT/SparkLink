import { RouteLocationRaw } from "vue-router";

export interface ITimelineItem {
  before: string;
  doing: string;
  after: string;
}

export interface ITimelineCustomMessage {
  index: number;
  message: string;
}

export interface INavItem {
  name: string;
  path: string;
  icon: string;
}

export interface IFooterNavItemUsingName {
  name: string;
  route: RouteLocationRaw;
}

export interface IFooterNavItemUsingIcon {
  icon: string;
  route: RouteLocationRaw;
}

export type IFooterNavItem = IFooterNavItemUsingName | IFooterNavItemUsingIcon;
