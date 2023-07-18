import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { IOrderAttributes, IOrderCreationAttributes, IOrderDetailsUniqueAttributes } from '@shared/data/entities';
import { } from '@shared/data/tables'
import { OrderDetails } from './order-details..table';
import { OrderDetailsForeignKey, OrderForeignKey } from '@backend-libs/foreign-keys';

@Table
export class Order extends Model<IOrderAttributes, IOrderCreationAttributes> implements IOrderAttributes {
    @Column({
        allowNull: true,
        type: DataType.UUID,
        primaryKey: true,
    })
    code!: string;

    @Column({ type: DataType.STRING })
    messageForOwner!: string;

    @HasMany(() => OrderDetails, OrderForeignKey.hasMany(OrderDetailsForeignKey))
    OrderDetails?: OrderDetails[];
}