import { 
    IProductAttributes, 
    IProductCreationAttributes 
} from '@backend-libs/entities';
import { 
    AccountForeignKey, 
    ProductForeignKey 
} from '@backend-libs/foreign-keys';
import { Color } from '@shared/enums';
import { 
    BelongsTo, 
    Column, 
    DataType, 
    ForeignKey, 
    Model, 
    Table 
} from 'sequelize-typescript';
import { Account } from './account.table';

@Table
export class Product 
    extends Model<IProductAttributes, IProductCreationAttributes>
    implements IProductAttributes
{
    @Column({
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
    })
    code!: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    description!: string;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    price!: number;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    color!: Color | null;

    @ForeignKey(() => Account)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    OwnerCode!: string;

    @BelongsTo(() => Account, ProductForeignKey.belongsTo(AccountForeignKey))
    Owner?: Account;
}
