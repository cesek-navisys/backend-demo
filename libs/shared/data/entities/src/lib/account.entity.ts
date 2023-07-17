import { Optional } from "sequelize";
import { IProductAttributes } from "./product.entity";

export interface IAccount {
    code: string;
}

export interface IAccountOwnAttributes {
    code: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    adress: string;
}

export interface IAccountReferenceAttributes {
    Orders: any[];
    Products: IProductAttributes[];
}

export interface IAccountUniqueAttributes extends Pick<IAccountOwnAttributes, 'code'> {

}

export interface IAccountCreationAttributes extends Optional<Omit<IAccountOwnAttributes, 'code'>, 'phone'> {
    name: string;
    surname: string;
    email: string;
    adress: string;
}

export interface IAccountAttributes extends IAccountOwnAttributes, Partial<IAccountReferenceAttributes> {

}