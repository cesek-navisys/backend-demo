import {
	IOrderDetailsOwnAttributes,
	IOrderDetailsUniqueAttributes,
} from '@backend-demo/backend-libs/entities';

export interface FindOrderDetailsBeforeEvent {
	orderDetailsBeforeFinding: IOrderDetailsUniqueAttributes;
}

export interface FindOrderDetailsAfterEvent {
	orderDetailsBeforeFinding: IOrderDetailsUniqueAttributes;
	orderDetails: IOrderDetailsOwnAttributes;
}
