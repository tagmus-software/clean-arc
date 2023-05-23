import EventEmitter from "events";
import { EventConsumerType } from "./types";

export const consumersMap: Map<string, EventConsumerType[]> = new Map();
export const localEventEmitter = new EventEmitter();
