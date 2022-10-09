import chalk from 'chalk';
import dotenv from 'dotenv';
import puppeteer, { Page } from 'puppeteer';
import { Participant } from '../model/participant.model';
import * as utils from '../utility/file.utils';

dotenv.config();

export async function getParticipants(): Promise<Participant[]> {
	const browser = await puppeteer.launch({ headless: true });

	const authPage = await browser.newPage();
	await login(authPage);

	const targetPage = await browser.newPage();

	const cookies = utils.getCookies();
	for (let cookie of cookies) {
		await targetPage.setCookie(cookie);
	}

	await targetPage.goto(process.env.TARGET_URL);
	await targetPage.bringToFront();

	await handleAmount(targetPage);
	const list = await getParticipantsArray(targetPage);

	return list.map((values) => new Participant(values));
}

export async function test(): Promise<void> {
	const browser = await puppeteer.launch({ headless: true });

	console.log('[TEST] : Started.');

	const authPage = await browser.newPage();

	console.log('[TEST] : Page loaded.');

	await authPage.goto(process.env.AUTH_URL);

	const warningPopUpSelector = '.cc-compliance a';
	const userNameTextFieldSelector = '#UserName';
	const passwordTextFieldSelector = '#Password';
	const loginButtonSelector = '.col-4 button';

	await authPage.waitForSelector(warningPopUpSelector);
	await authPage.click(warningPopUpSelector);

	await authPage.waitForSelector(userNameTextFieldSelector);
	await authPage.type(userNameTextFieldSelector, process.env.STUDENT_NO);

	await authPage.waitForSelector(passwordTextFieldSelector);
	await authPage.type(passwordTextFieldSelector, process.env.STUDENT_PASSWORD);

	await authPage.waitForSelector(loginButtonSelector);
	await authPage.click(loginButtonSelector);

	let cookies = await authPage.cookies();

	utils.saveCookies(cookies);

	const targetPage = await browser.newPage();

	const local_cookies = utils.getCookies();
	for (let cookie of local_cookies) {
		await targetPage.setCookie(cookie);
	}

	await targetPage.goto(process.env.TARGET_URL);
	await targetPage.bringToFront();

	const amount = await targetPage.evaluate(() => {
		const amountSelector = 'h6';
		return document.querySelector(amountSelector)?.lastChild?.textContent;
	});

	console.log(amount);

	const list = await getParticipantsArray(targetPage);

	console.log(list);

	console.log('[TEST] : Completed.');

	await browser.close();

	process.exit(0);
}

async function login(page: Page) {
	try {
		const warningPopUpSelector = '.cc-compliance a';
		const userNameTextFieldSelector = '#UserName';
		const passwordTextFieldSelector = '#Password';
		const loginButtonSelector = '.col-4 button';

		console.info('[INFO] : Service : Logging in to the site..');

		await page.goto(process.env.AUTH_URL);

		await page.waitForSelector(warningPopUpSelector);
		await page.click(warningPopUpSelector);

		await page.waitForSelector(userNameTextFieldSelector);
		await page.type(userNameTextFieldSelector, process.env.STUDENT_NO);

		await page.waitForSelector(passwordTextFieldSelector);
		await page.type(passwordTextFieldSelector, process.env.STUDENT_PASSWORD);

		await page.waitForSelector(loginButtonSelector);
		await page.click(loginButtonSelector);

		let cookies = await page.cookies();

		utils.saveCookies(cookies);

		console.info('[INFO] : Service : Logged in to the site.');
	} catch (err) {
		console.error(err);
	}
}

async function handleAmount(page: Page): Promise<void> {
	const participantAmountText = 'Üye Sayısı:';
	const p1 = '(';
	const p2 = ')';
	var newParticipantAmount = 0;

	console.info('[INFO] : Service : User amount are being handled...');

	const amount = await page.evaluate(() => {
		const amountSelector = 'h6';
		return document.querySelector(amountSelector)?.lastChild?.textContent;
	});
	const oldAmount = utils.getAmount();
	if (amount !== undefined && amount !== null) {
		let amt = Number.parseInt(amount);
		utils.saveAmount(amt);
		newParticipantAmount = amt - oldAmount;
	}

	console.info('[INFO] : Service : User amount has been handled.');

	console.info(
		chalk.gray(participantAmountText),
		amount,
		chalk.green(p1 + newParticipantAmount + p2)
	);
}

async function getParticipantsArray(page: Page): Promise<string[][]> {
	return await page.$$eval('tbody tr', (rows) => {
		return Array.from(rows, (row) => {
			const columns = row.querySelectorAll('td');
			return Array.from(columns, (column) => column.innerText);
		});
	});
}
