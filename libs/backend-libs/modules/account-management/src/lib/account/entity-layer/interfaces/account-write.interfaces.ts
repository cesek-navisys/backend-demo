import { IAccountCreate } from '../../dto/interfaces/create-account.interface';
import { IAccountUpdate } from '../../dto/interfaces/update-account.interface';

export interface IAccountCreatePayload extends IAccountCreate {}

export interface IAccountUpdatePayload extends IAccountUpdate {}

export interface IAccountUpsertPayload extends IAccountCreatePayload {
	accountCode: string;
}

export interface IAccountCreateOneQuery {}

export interface IAccountCreateOneParams {}

export interface IAccountCreateManyQuery {}

export interface IAccountCreateManyParams {}

export interface IAccountUpdateOneQuery {}

export interface IAccountUpdateOneParams {
	accountCode: string;
}

export interface IAccountUpdateManyQuery {}

export interface IAccountUpdateManyParams {}

export interface IAccountUpsertOneQuery {}

export interface IAccountUpsertOneParams {}
