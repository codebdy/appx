import { IPosted } from "./IPosted";
import { IRemoved } from "./IRemoved";
import { IUpdated } from "./IUpdated";

export const EVENT_DATA_CREATED = "apper:created";
export const EVENT_DATA_REMOVED = "apper:removed";
export const EVENT_DATA_UPDATED = "apper:updated";

export type Handler = (event: CustomEvent) => void;

function on(eventType: string, listener: EventListener) {
  document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: EventListener) {
  document.removeEventListener(eventType, listener);
}

function once(eventType: string, listener: EventListener) {
  const handleEventOnce = (event: CustomEvent) => {
    listener(event);
    off(eventType, handleEventOnce as any);
  };

  on(eventType, handleEventOnce as any);
}

function trigger(eventType: string, data: any/*IPosted | IRemoved | IUpdated*/) {
  console.log('trigger事件', eventType, data);
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, once, off, trigger };
