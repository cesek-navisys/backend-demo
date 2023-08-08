import {
	CreateAccountAfterEvent,
	CreateAccountBeforeEvent,
} from './account-management';
import {
	FindOrderDetailsAfterEvent,
	FindOrderDetailsBeforeEvent,
} from './order-details-management';

export type EventPayloads = {
	'create.account:before': CreateAccountBeforeEvent;
	'create.account:after': CreateAccountAfterEvent;
	'find.orderDetails:before': FindOrderDetailsBeforeEvent;
	'find.orderDetails:after': FindOrderDetailsAfterEvent;
};

export type EventName = keyof EventPayloads;

export function emitEvent<K extends EventName>(
	eventName: K,
	payload: EventPayloads[K]
) {}
