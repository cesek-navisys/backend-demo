import {
	IAccountCreationAttributes,
	IAccountOwnAttributes,
} from '@backend-demo/backend-libs/entities';

export interface CreateAccountBeforeEvent {
	accountBeforeCreation: IAccountCreationAttributes;
}

export interface CreateAccountAfterEvent {
	accountBeforeCreation: IAccountCreationAttributes;
	account: IAccountOwnAttributes;
}
