import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import {
    CreateAccountAfterEvent,
    EventName,
} from '@backend-demo/backend-libs/events';
import { ProductWriteService } from '../entity-layer/product-write.service';

@Injectable()
export class ProductEventHandler {
    constructor(private readonly productWriteService: ProductWriteService) { }

    @OnEvent('create.account:after' as EventName)
    async onAfterCreateAccountEvent(payload: CreateAccountAfterEvent) {
        const { account } = payload;
        await this.productWriteService.createOne(
            {
                accountCode: account.code,
            },
            {
                description: `Default product for ${account.name}`,
                name: 'Default product',
                price: 0,
            }
        );
    }
}
