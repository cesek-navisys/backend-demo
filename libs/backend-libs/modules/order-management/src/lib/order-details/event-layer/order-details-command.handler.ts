import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(FindOrderDetailsByCodeCommand)
export class CommandFindOrderDetailsByCodeHandler implements ICommandHandler<FindOrderDetailsByCodeCommand> {
    constructor(
        private readonly orderDetailsReadService: OrderDetailsReadService,
    ) { }
    async execute(query: FindOrderDetailsByCodeCommand) {
        const { params } = query;
        const { accountCode, productCode } = params;
        return this.orderDetailsReadService.findOne({ productCode, accountCode })
    }
}