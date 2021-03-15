import { writable } from 'svelte/store';
import {events} from "./events.json";

export const selectedEvent = writable(events[0]);
export const selectedDetection = writable(events[0].detections[0]);