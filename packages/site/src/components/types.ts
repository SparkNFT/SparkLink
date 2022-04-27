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
