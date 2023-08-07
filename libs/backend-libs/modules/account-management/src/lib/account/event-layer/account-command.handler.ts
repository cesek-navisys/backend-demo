import { AccountWriteService } from '../entity-layer/account-write.service';
import { ActivateAccountByCodeCommand } from '@backend-demo/backend-libs/commands';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ActivateAccountByCodeCommand)
export class CommandActivateAccountByCodeHandler
	implements ICommandHandler<ActivateAccountByCodeCommand>
{
	constructor(private readonly accountWriteService: AccountWriteService) {}
	execute(command: ActivateAccountByCodeCommand) {
		const { params } = command;
		const { accountCode } = params;
		return this.accountWriteService.updateOne(
			{ code: accountCode },
			{ isActive: true }
		);
	}
}
