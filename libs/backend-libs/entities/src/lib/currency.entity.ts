export interface ICurrencyAttributes {
    code: string;
    name: string;
    /**
     * according to USD
     */
    exchangeRate: number;
    decimals: number;
}

export const currencies: ICurrencyAttributes[] = [
    {
        code: 'CZK',
        name: 'Czech koruna',
        exchangeRate: 23.50,
        decimals: 2,
    },
    {
        code: 'RUB',
        name: 'Russian Ruble',
        exchangeRate: 99.98,
        decimals: 2,
    },
    {
        code: 'HUF',
        name: 'Hungarian Forint',
        decimals: 0,
        exchangeRate: 348,
    },
    {
        code: 'USD',
        name: 'United States Dollar',
        decimals: 2,
        exchangeRate: 1,
    },
]