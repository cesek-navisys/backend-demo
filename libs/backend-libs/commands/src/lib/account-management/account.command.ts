import { Account } from '@backend-demo/backend-libs/tables';
import { Command } from '@nestjs-architects/typed-cqrs';

export interface IActivateAccountByCodeCommand {
	accountCode: string;
}

export class ActivateAccountByCodeCommand extends Command<Account> {
	constructor(public readonly params: IActivateAccountByCodeCommand) {
		super();
	}
}
