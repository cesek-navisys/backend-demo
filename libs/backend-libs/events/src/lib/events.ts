import { CreateAccountAfterEvent, CreateAccountBeforeEvent } from './account-management'
import { EventEmitter2 } from '@nestjs/event-emitter';

export type EventPayloads = {
    'create.account:before': CreateAccountBeforeEvent,
    'create.account:after': CreateAccountAfterEvent,
}

export type EventName = keyof EventPayloads;

export function emitEvent<K extends EventName>(eventName: K, payload: EventPayloads[K]) {
}