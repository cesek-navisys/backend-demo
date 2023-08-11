import {
    DivisionByZeroError,
    InputNumberIsNegativeError,
    MissingCurrenciesError,
} from './order-write.errors';
import { MyAnalysisResult, OrderWriteService } from './order-write.service';
import {
    ICurrencyAttributes,
    currencies,
} from '@backend-demo/backend-libs/entities';

describe('order-write service testing suite', () => {
    let orderWriteService: OrderWriteService;
    let orderRepository: any;
    let orderReadService: any;

    beforeEach(() => {
        orderWriteService = new OrderWriteService(
            orderRepository,
            orderReadService
        );
    });

    describe('testing total price exchange rates', () => {
        it('should result same price as the input and output currency is the same', () => {
            // Arrange
            const inputPrice = 100.1;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
            } as ICurrencyAttributes as any;

            const expectedOutputPrice = 100.1;

            // Act
            const outputPrice =
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                );

            // Assert
            expect(outputPrice).toBe(expectedOutputPrice);
        });

        it('should correctly calculate price from one currency to another', () => {
            // Arrange
            const inputPrice = 365;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'CZK'),
                exchangeRate: 25.25,
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'RUB'),
                exchangeRate: 190.19,
            } as ICurrencyAttributes as any;

            const expectedOutputPrice = 2749.28;

            // Act
            const outputPrice =
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                );

            // Assert
            expect(outputPrice).toBe(expectedOutputPrice);
        });

        it('should be zero if input is zero', () => {
            // Arrange
            const inputPrice = 0;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'CZK'),
                exchangeRate: 25.25,
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'RUB'),
                exchangeRate: 190.19,
            } as ICurrencyAttributes as any;

            const expectedOutputPrice = 0;

            // Act
            const outputPrice =
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                );

            // Assert
            expect(outputPrice).toBe(expectedOutputPrice);
        });

        it('should use no decimals in the result and rounded correctly', () => {
            // Arrange
            const inputPrice = 366;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'RUB'),
                exchangeRate: 117.88,
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'HUF'),
                exchangeRate: 353.55,
            } as ICurrencyAttributes as any;

            const expectedOutputPrice = 1098; // real result = 1097,720563284696

            // Act
            const outputPrice =
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                );

            // Assert
            expect(outputPrice).toBe(expectedOutputPrice);
        });

        it('should fail because division by zero', () => {
            // Arrange
            const inputPrice = 100.1;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
                exchangeRate: 0,
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
            } as ICurrencyAttributes as any;

            // Act and Assert
            expect(() =>
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                )
            ).toThrow(DivisionByZeroError);
        });

        it('should fail because input price is negative', () => {
            // Arrange
            const inputPrice = -5;
            const inputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
            } as ICurrencyAttributes as any;
            const outputCurrency = {
                ...currencies.find((c) => c.code === 'USD'),
                exchangeRate: 0,
            } as ICurrencyAttributes as any;

            // Act and Assert
            expect(() =>
                orderWriteService.convertTotalPriceToACurrencyAndRound(
                    inputPrice,
                    inputCurrency,
                    outputCurrency
                )
            ).toThrow(InputNumberIsNegativeError);
        });
    });

    describe('my strange analysis', () => {
        let price1: number;
        let price2: number;
        let currency1: ICurrencyAttributes;
        let from: Date;
        let to: Date;

        it('specific input should result specific outputs', () => {
            // Arrange
            price1 = 5.50;
            price2 = 10.15;
            currency1 = { exchangeRate: 15 } as Partial<ICurrencyAttributes> as ICurrencyAttributes;
            from = new Date();
            to = new Date();

            const expectedResult: MyAnalysisResult = {
                analysisName: 'ABC',
                summary: {
                    max: 8,
                    total: 10,
                }
            }

            // Act
            const result =
                orderWriteService.doSomeAnalysis(
                    price1,
                    price2,
                    currency1,
                    from,
                    to,
                );

            // Assert
            expect(result).toBe(expectedResult);
        });
    });

});
