import {
	FirstWordMustStartWithCapitalLetterError,
	NameIsEmptyError,
	NameIsUndefinedError,
	NameIsWhitespaceError,
	NameLengthError,
	WordCanNotStartWithNumber,
	WordContainsInvalidCharacters,
} from './product-write.errors';
import { ProductWriteService } from './product-write.service';

describe('product-write service testing suite', () => {
	let productWriteService: ProductWriteService;
	let productRepository: any;
	let productReadService: any;

	beforeEach(() => {
		productWriteService = new ProductWriteService(
			productRepository,
			productReadService
		);
	});

	describe('testing name of product with regex', () => {
		it('should validate a correct product name', () => {
			const testName = 'Windows The best';
			const validation = productWriteService.isValidProductName(testName);
			expect(validation).toBeNull();
		});

		it('should validate a correct product name with number', () => {
			const testName = 'Microsoft Professional (v.2017)';
			const validation = productWriteService.isValidProductName(testName);
			expect(validation).toBeNull();
		});

		it('should validate a correct product name with symbols', () => {
			const testName = 'It-is (test) Name_For, Product.';
			const validation = productWriteService.isValidProductName(testName);
			expect(validation).toBeNull();
		});

		it('should fail because product name is empty', () => {
			const testName = '';
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(NameIsEmptyError);
		});

		it('should fail because product name is undefined', () => {
			let testName: string;
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(NameIsUndefinedError);
		});

		it('should fail because product name consists only of whitespace', () => {
			const testName = '   ';
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(NameIsWhitespaceError);
		});

		it('should fail because product name is too short', () => {
			const testName = 'Test';
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(NameLengthError);
		});

		it('should fail because product name starting with lowercase', () => {
			const testName = 'some random Product';
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(FirstWordMustStartWithCapitalLetterError);
		});

		it('should fail because some word in the product name starts with a number', () => {
			const testName = 'Test Product 1Name';
			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(WordCanNotStartWithNumber);
		});

		it('should fail because a word contains invalid characters', () => {
			const testName = 'Product Name With #Invalid Character';
			const words = testName.split(/\s|-/);
			let offendingWord = '';

			for (const word of words) {
				if (!/^[A-Za-z0-9\-_(),.]+$/.test(word)) {
					offendingWord = word;
					break;
				}
			}

			expect(() =>
				productWriteService.isValidProductName(testName)
			).toThrow(new WordContainsInvalidCharacters(offendingWord));
		});
	});
});
