import { Protocol } from 'puppeteer';
import * as utils from '../../src/utility/file.utils';

describe('file utils module', () => {
	test('getAmount test', () => {
		let amount = utils.getAmount();
		expect(amount).toBe(20);
	});

	test('saveAmount test', () => {
		utils.saveAmount(20);
		let amount = utils.getAmount();
		expect(amount).toBe(20);
	});

	test('getCookies test', () => {
		let cookies = utils.getCookies();
		expect(cookies).toEqual(mockCokkie1);
	});

	test('saveCookies test', () => {
		utils.saveCookies(mockCokkie1 as Protocol.Network.Cookie[]);
		let cookies = utils.getCookies();
		expect(cookies).toEqual(mockCokkie1);
	});
});

const mockCokkie1 = [
	{
		name: 'cookie1',
		value: 'dismiss',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: 1695581590,
		size: 27,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: '.AspNetCore.Identity.Application',
		value:
			'CfDJ8Mj3276IvDBFrT46B9NYKhRrW_QNjxDucXbctPKLzehEP0QsywYFkPRY9_ztImdoV340LKEDym_v1U4uKfj-YlLF9RY0VY3ah9ZEPqsYz2C0L3mj60fFsS6nR_Xn412jBTCazlk56qua6ej8Zn5AykPxkOf2tphFO_61xAOv1hPLcLS4-2i4HQVeAz8woix9J7n8TOIUkEq2Dp1QNIQzFho-67u0b_BjASKnUYYwYoCly4Zvy1cWPKxXTks27k-TE4ASKbd7Lz4BxbVU7aKUPvhAT3zXHyhGIXVEoqbCswKJM9081BA0OYVqE4APTdl2LaCCxI9faOvbZ_tvRqt08G6LGN4_HRNOmaEt8yKkZ8Jvt9RYo4ch8KL0ILSWj6FF8ccj1KJWsWz4dNfWemYQeymbSV0KJxiqlsjgCT-82i_1jtEm_5pW9S443BI0RMPZQvZfZERMbthCjZ3ZnPM3Ah1HUYt7dE1McOxbQFoedHGUfEVDW5oZX1kY33MetBfNwzEH8ewKWqmg-0XkzNCSFUv8YKpbJ9M4UcRAopmscBPMmyS9gRgWZN5SVkQAFinGXV5X_dE-lCPpKAAIzSZzpfBExnNqt6JAURB6OAHezbTFAY_4euXADWSoe5XFjCFuXXX6P_FE9RrJNBeBWOV_0Wi2McCp9rNCzOqWHA1lZNfdTWj1QLgHP-O0T9yXrKgTx03NuvxKOBTOMOY-65lmK88',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: -1,
		size: 763,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'Lax',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: '.AspNetCore.Antiforgery.SqEgFM4u9JU',
		value:
			'CfDJ8Mj3276IvDBFrT46B9NYKhQLUnSjqcfbPsNj5IKggjjRZTSUjqzy3BWQqGOwf9Y_wkyL7jEs-turlgkQQ52NKT5qLK6FI-Ej4SZJrunWEaj8WnsGjcpHa1KsLW3BE-p7sTjSiVMY02CTXAP3ujHnFYI',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: -1,
		size: 190,
		httpOnly: true,
		secure: false,
		session: true,
		sameSite: 'Strict',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
];

const mockCokkie2 = [
	{
		name: 'cookie2',
		value: 'dismiss',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: 1695581590,
		size: 27,
		httpOnly: false,
		secure: false,
		session: false,
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: '.AspNetCore.Identity.Application',
		value:
			'CfDJ8Mj3276IvDBFrT46B9NYKhRrW_QNjxDucXbctPKLzehEP0QsywYFkPRY9_ztImdoV340LKEDym_v1U4uKfj-YlLF9RY0VY3ah9ZEPqsYz2C0L3mj60fFsS6nR_Xn412jBTCazlk56qua6ej8Zn5AykPxkOf2tphFO_61xAOv1hPLcLS4-2i4HQVeAz8woix9J7n8TOIUkEq2Dp1QNIQzFho-67u0b_BjASKnUYYwYoCly4Zvy1cWPKxXTks27k-TE4ASKbd7Lz4BxbVU7aKUPvhAT3zXHyhGIXVEoqbCswKJM9081BA0OYVqE4APTdl2LaCCxI9faOvbZ_tvRqt08G6LGN4_HRNOmaEt8yKkZ8Jvt9RYo4ch8KL0ILSWj6FF8ccj1KJWsWz4dNfWemYQeymbSV0KJxiqlsjgCT-82i_1jtEm_5pW9S443BI0RMPZQvZfZERMbthCjZ3ZnPM3Ah1HUYt7dE1McOxbQFoedHGUfEVDW5oZX1kY33MetBfNwzEH8ewKWqmg-0XkzNCSFUv8YKpbJ9M4UcRAopmscBPMmyS9gRgWZN5SVkQAFinGXV5X_dE-lCPpKAAIzSZzpfBExnNqt6JAURB6OAHezbTFAY_4euXADWSoe5XFjCFuXXX6P_FE9RrJNBeBWOV_0Wi2McCp9rNCzOqWHA1lZNfdTWj1QLgHP-O0T9yXrKgTx03NuvxKOBTOMOY-65lmK88',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: -1,
		size: 763,
		httpOnly: true,
		secure: true,
		session: true,
		sameSite: 'Lax',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
	{
		name: '.AspNetCore.Antiforgery.SqEgFM4u9JU',
		value:
			'CfDJ8Mj3276IvDBFrT46B9NYKhQLUnSjqcfbPsNj5IKggjjRZTSUjqzy3BWQqGOwf9Y_wkyL7jEs-turlgkQQ52NKT5qLK6FI-Ej4SZJrunWEaj8WnsGjcpHa1KsLW3BE-p7sTjSiVMY02CTXAP3ujHnFYI',
		domain: 'topluluk-etkinlik.uludag.edu.tr',
		path: '/',
		expires: -1,
		size: 190,
		httpOnly: true,
		secure: false,
		session: true,
		sameSite: 'Strict',
		sameParty: false,
		sourceScheme: 'Secure',
		sourcePort: 443,
	},
];
