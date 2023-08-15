export class NameIsEmptyOrUndefinedError extends Error {
	constructor() {
		super(`Name is empty or undefined.`);
	}
}

export class NameLengthError extends Error {
	constructor() {
		super(`Name length must be between 5 and 50 characters.`);
	}
}

export class EmptyNameError extends Error {
	constructor() {
		super('Name does not contain any words.');
	}
}

export class FirstWordMustStartWithCapitalLetterError extends Error {
	constructor() {
		super(`The first word in the name must start with a capital letter.`);
	}
}

export class WordCanNotStartWithNumber extends Error {
	constructor() {
		super(`Words in the name can't start with a number.`);
	}
}

export class WordContainsInvalidCharacters extends Error {
	constructor(input: string) {
		super(`The word '${input}' contains invalid characters.`);
	}
}
