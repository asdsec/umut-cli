import { fixPhoneNumber } from '../../src/utility/fixPhoneNumber';

describe('fixPhoneNumber module', () => {
	test('should add 9 at beginning', () => {
		expect(fixPhoneNumber('05445556677')).toBe('905445556677');
	});

	test('should add 0 and 9 at beginning', () => {
		expect(fixPhoneNumber('5445556677')).toBe('905445556677');
	});

	test('should trim all blank at beginning', () => {
		expect(fixPhoneNumber('90 5445556677')).toBe('905445556677');
	});

	test('should trim two blanks at beginning', () => {
		expect(fixPhoneNumber('90  5445556677')).toBe('905445556677');
	});

	test('should remove + at beginning', () => {
		expect(fixPhoneNumber('+905445556677')).toBe('905445556677');
	});

	test('should handle', () => {
		expect(fixPhoneNumber('0535 253 56 52')).toBe('905352535652');
	});
});
