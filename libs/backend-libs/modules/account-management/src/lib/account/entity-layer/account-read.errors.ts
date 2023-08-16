export class WrongDateStringFormatError extends Error {
	constructor(dateString: string) {
		super(
			`Date: ${dateString} has not right format - only ISO 8601 format is being accepted`
		);
	}
}

export class InvalidDateError extends Error {
	constructor(date: string) {
		super(`Date: ${date} is invalid`);
	}
}

export class EmptyDateStringListError extends Error {
	constructor() {
		super('List of date strings is empty');
	}
}
