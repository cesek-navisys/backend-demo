import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import {IOrderAttributes, IOrderCreationAttributes, IOrderDetailsUniqueAttributes}from '@shared/data/entities';
import {} from '@shared/data/tables'

@Table
export class Order extends Model<IOrderAttributes, IOrderCreationAttributes> implements IOrderAttributes {
    @Column({
        allowNull: true,  
        type: DataType.UUID,
    })
    code!: string;

    @Column({type: DataType.STRING})
    messageForOwner!: string;
}