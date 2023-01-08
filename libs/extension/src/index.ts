import { Extension, HDirection, HFloorItem } from "gnode-api";
import { EventEmitter } from "events";
import { floorItemsSchema, type floorItems } from "@habbo-extension/types";

const extensionInfo = {
  name: "My Extension",
  description: "My first G-Node extension",
  version: "0.1",
  author: "Your name",
};
interface MyEvents {
  floorItems: (data: floorItems) => void;
}

declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean;
}

class MyEventEmitter extends EventEmitter {}

export const events = new MyEventEmitter();
export const ext = new Extension(extensionInfo);

ext.interceptByNameOrHash(HDirection.TOCLIENT, "Objects", (hMessage) => {
  const packet = hMessage.getPacket();
  const items = HFloorItem.parse(packet);
  const floorItems = items.map((item) => item.id);
  floorItemsSchema.parse(floorItems);
  events.emit("floorItems", floorItems);
});
