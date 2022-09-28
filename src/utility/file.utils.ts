import dotenv from 'dotenv';
import fs from 'fs';
import { Page, Protocol } from 'puppeteer';
import { Amount } from '../model/amount.model';

dotenv.config();

const encoding = 'utf-8';
const kZero = 0;

export function saveAmount(amount: number) {
	try {
		const obj = new Amount(amount);
		fs.writeFileSync(process.env.AMOUNT_PATH, JSON.stringify(obj));
	} catch (err) {
		console.error(err);
	}
}

export function getAmount(): number {
	try {
		if (fs.existsSync(process.env.AMOUNT_PATH)) {
			const data = fs.readFileSync(process.env.AMOUNT_PATH, encoding);
			const obj = JSON.parse(data) as Amount;
			return obj.amount;
		}
	} catch (err) {
		console.error(err);
	}

	return kZero;
}

export function getCookies(): Protocol.Network.Cookie[] {
	try {
		if (fs.existsSync(process.env.COOKIES_PATH)) {
			const cookiesString = fs.readFileSync(process.env.COOKIES_PATH, encoding);
			return JSON.parse(cookiesString) as Protocol.Network.Cookie[];
		}
		return [];
	} catch (err) {
		console.error(err);
		return [];
	}
}

export async function saveCookies(
	cookies: Protocol.Network.Cookie[]
): Promise<void> {
	try {
		fs.writeFileSync(
			process.env.COOKIES_PATH,
			JSON.stringify(cookies),
			encoding
		);
	} catch (err) {
		console.error(err);
	}
}
