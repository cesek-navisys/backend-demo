import { AccountReadService } from './account-read.service';
import {
	WrongDateStringFormatError,
	InvalidDateError,
	EmptyDateStringListError,
} from './account-read.errors';

describe('account read service testing suite', () => {
	let accountReadService: AccountReadService;
	let accountRepository: any;
	let accountQueryService: any;

	beforeEach(() => {
		accountReadService = new AccountReadService(
			accountRepository,
			accountQueryService
		);
	});

	describe('testing generating hour frequency from date string array', () => {
		it('should fail, because of wrong date string format', () => {
			//Arrange
			const inputArray = ['2020-10-17', '2014-05-22'];

			//Act and Assert
			expect(() => {
				accountReadService.getHourFrequencyFromDateStrings(inputArray);
			}).toThrow(WrongDateStringFormatError);
		});

		it('should fail, because of not parsable format', () => {
			//Arrange
			const inputArray = ['21.5.98', 'Blbost', undefined, null];

			//Act and Assert
			expect(() => {
				accountReadService.getHourFrequencyFromDateStrings(
					inputArray as any
				);
			}).toThrow(InvalidDateError);
		});

		it('should fail, because of string is being undefined', () => {
			//Arrange
			const inputArray = [undefined];

			//Act and Assert
			expect(() => {
				accountReadService.getHourFrequencyFromDateStrings(
					inputArray as any
				);
			}).toThrow(InvalidDateError);
		});

		it('should fail, because of invalid date', () => {
			//Arrange
			const inputArray = ['Blbost'];

			//Act and Assert
			expect(() => {
				accountReadService.getHourFrequencyFromDateStrings(
					inputArray as any
				);
			}).toThrow(InvalidDateError);
		});

		it('should fail, because of empty list', () => {
			//Arrange
			const inputArray: any = [];

			//Act and Assert
			expect(() => {
				accountReadService.getHourFrequencyFromDateStrings(inputArray);
			}).toThrow(EmptyDateStringListError);
		});

		it('should correctly calculate frequency of hours of three items', () => {
			//Arrange
			const inputArray = [
				'2019-01-01T10:27:34',
				'2019-01-28T15:22:07',
				'2019-01-28T15:22:02',
			];

			const expectedOutput = {
				'0': 0,
				'1': 0,
				'2': 0,
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0,
				'8': 0,
				'9': 0,
				'10': 0.33,
				'11': 0,
				'12': 0,
				'13': 0,
				'14': 0,
				'15': 0.66,
				'16': 0,
				'17': 0,
				'18': 0,
				'19': 0,
				'20': 0,
				'21': 0,
				'22': 0,
				'23': 0,
			};
			//Act
			const output =
				accountReadService.getHourFrequencyFromDateStrings(inputArray);

			//Assert
			expect(output).toStrictEqual(expectedOutput);
		});
	});
});
