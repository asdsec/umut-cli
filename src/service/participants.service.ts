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

	await browser.close();

	return list.map((values) => new Participant(values));
}

async function login(page: Page) {
	try {
		const warningPopUpSelector = '.cc-compliance a';
		const userNameTextFieldSelector = '#UserName';
		const passwordTextFieldSelector = '#Password';
		const loginButtonSelector = '.col-4 button';

		await page.goto(process.env.AUTH_URL);

		await page.waitForSelector(warningPopUpSelector);
		await page.click(warningPopUpSelector);

		await page.waitForSelector(userNameTextFieldSelector);
		await page.type(userNameTextFieldSelector, process.env.USERNAME);

		await page.waitForSelector(passwordTextFieldSelector);
		await page.type(passwordTextFieldSelector, process.env.PASSWORD);

		await page.waitForSelector(loginButtonSelector);
		await page.click(loginButtonSelector);

		let cookies = await page.cookies();

		utils.saveCookies(cookies);
	} catch (err) {
		console.error(err);
	}
}

async function handleAmount(page: Page): Promise<void> {
	const amountSelector = 'h6';
	const participantAmountText = 'Üye Sayısı:';
	const p1 = '(';
	const p2 = ')';
	var newParticipantAmount = 0;

	const amount = await page.evaluate(() => {
		return document.querySelector(amountSelector)?.lastChild?.textContent;
	});
	const oldAmount = utils.getAmount();
	if (amount !== undefined && amount !== null) {
		let amt = Number.parseInt(amount);
		utils.saveAmount(amt);
		newParticipantAmount = amt - oldAmount;
	}

	console.info(
		chalk.gray(participantAmountText),
		amount,
		chalk.green(p1 + newParticipantAmount + p2)
	);
}

async function getParticipantsArray(page: Page): Promise<string[][]> {
	const tableSelector = 'tbody tr';
	const tableColumnSelector = 'td';
	return await page.$$eval(tableSelector, (rows) => {
		return Array.from(rows, (row) => {
			const columns = row.querySelectorAll(tableColumnSelector);
			return Array.from(columns, (column) => column.innerText);
		});
	});
}
