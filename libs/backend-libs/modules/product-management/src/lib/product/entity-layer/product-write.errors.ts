export class NameIsEmptyError extends Error {
	constructor() {
		super(`Name is empty.`);
	}
}

export class NameIsUndefinedError extends Error {
	constructor() {
		super(`Name is undefined.`);
	}
}

export class NameIsWhitespaceError extends Error {
	constructor() {
		super(`Name consists only of whitespace.`);
	}
}

export class NameLengthError extends Error {
	constructor() {
		super(`Name length must be between 5 and 50 characters.`);
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
