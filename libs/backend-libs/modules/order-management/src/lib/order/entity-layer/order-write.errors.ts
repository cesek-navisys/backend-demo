export class InputNumberIsNegativeError extends Error {
    constructor(input: number) {
        super(`Number '${input}' cannot be negative!`)
    }
}

export class DivisionByZeroError extends Error {
    constructor() {
        super(`Division by zero!`)
    }
}

export class MissingCurrenciesError extends Error {
    constructor() {
        super(`Missing source or target currency.`)
    }
}

