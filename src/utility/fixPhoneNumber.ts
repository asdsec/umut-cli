const kZero = '0';
const kFive = '5';
const kNine = '9';
const kEmpty = '';
const plusRegEx = /\+/g;
const antiNumberRegEx = /[^0-9]/g;
const blankRegEx = /\s+/g;

export function fixPhoneNumber(phone: string): string {
	phone = phone.trim().replace(plusRegEx, kEmpty).replace(blankRegEx, kEmpty);

	if (phone.match(antiNumberRegEx)) return kEmpty;

	if (phone.length === 10 && phone.startsWith(kFive)) {
		return kNine + kZero + phone;
	}

	if (phone.length === 11 && phone.startsWith(kZero)) {
		return kNine + phone;
	}

	if (phone.length === 12 && phone.startsWith(kNine)) {
		return phone;
	}

	return kEmpty;
}

export function checkIsValid(phone: string): boolean {
	return phone.length === 12 && phone.startsWith(kNine);
}
