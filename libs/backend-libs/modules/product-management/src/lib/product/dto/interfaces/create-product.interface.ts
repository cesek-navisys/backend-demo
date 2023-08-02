import { Color } from '@backend-demo/shared/enums';

export interface IProductCreate {
	name: string;
	description: string;
	price: number;
	color?: Color;
}
