<template>
  <el-timeline>
    <el-timeline-item
      v-for="(item, index) in timeLine"
      :key="index"
      :type="item.type"
      :hollow="item.hollow"
      :timestamp="item.timestamp"
    >
      {{ item.title }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
// Scope: Transient

import { computed } from "vue";
import type { ITimelineCustomMessage, ITimelineItem as IItem } from "./types";

interface ITimelineItem {
  title: string;
  timestamp: string;
  type: "primary" | undefined;
  hollow: boolean;
}

const props = defineProps<{
  items: IItem[];
  progress: number;
  customMessage?: ITimelineCustomMessage;
}>();

function getInitTimeLine(): ITimelineItem[] {
  return props.items.map(
    (item) =>
      ({
        title: item.before,
        timestamp: "waiting...",
        hollow: false,
      } as ITimelineItem)
  );
}

function doing(item: ITimelineItem, index: number) {
  item.title = props.items[index].doing;
  item.timestamp = "executing...";
  item.type = "primary";
  item.hollow = true;
}

const timestampMap = new Map<number, string>();

function done(item: ITimelineItem, index: number) {
  item.title = props.items[index].after;
  item.timestamp = new Date().toLocaleTimeString("it-IT");
  item.type = "primary";
  item.hollow = false;
  if (!timestampMap.has(index)) timestampMap.set(index, item.timestamp);
}

function retrieveTimestamp(index: number) {
  return timestampMap.get(index) ?? "ERROR";
}

const timeLine = computed(() =>
  getInitTimeLine().map((value, index) => {
    if (index < props.progress) {
      done(value, index);
      value.timestamp = retrieveTimestamp(index);
    } else if (index === props.progress) doing(value, index);
    if (props.customMessage) {
      const message = props.customMessage as ITimelineCustomMessage;
      if (index === message.index)
        value.title = `${value.title}, ${message.message}`;
    }
    return value;
  })
);
</script>
