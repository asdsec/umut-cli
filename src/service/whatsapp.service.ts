import dotenv from 'dotenv';
import { Client, GroupChat } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { Participant } from '../model/participant.model';
import { checkIsValid, fixPhoneNumber } from '../utility/fixPhoneNumber';
import chalk from 'chalk';
import '../extensions/string.extensions';

dotenv.config();

type OnReadyCallBack<R> = (() => Promise<R>) | (() => R);

class CustomClient extends Client {
	async getGroupChat(groupName: string): Promise<GroupChat | undefined> {
		const chats = await this.getChats();
		const chat = chats.find((chat) => chat.name === groupName);
		if (chat?.isGroup) return chat as GroupChat;
	}

	async run<R>(onReady: OnReadyCallBack<R>): Promise<R> {
		const ready = 'ready';
		var result: any;
		this.on(ready, async () => {
			console.info('[INFO] : Whatsapp : Whatsapp is ready.');
			console.info('[INFO] : Whatsapp : Main operation has been started.');
			result = await onReady();
			console.info('[INFO] : Whatsapp : Main operation has been completed.');
		});
		return result as R;
	}
}

export const client = new CustomClient({});

function getGroupPhones(group: GroupChat) {
	return group.participants.map((user) => user.id.user);
}

export function login(): void {
	const qr = 'qr';

	client.on(qr, (qr) => {
		console.info('[INFO] : Whatsapp : Qr code is ready.');
		qrcode.generate(qr, { small: true });
	});
}

export async function addToGroup(
	participantIds: string[],
	groupName: string
): Promise<number | undefined> {
	const group = await client.getGroupChat(groupName);

	console.info('[INFO] : Whatsapp : Users are being added to the group...');

	if (group) {
		const ids = participantIds.map((phone) => {
			return fixPhoneNumber(phone).serialized();
		});
		const result = await group.addParticipants(ids);
		console.info('[INFO] : Whatsapp : Users have been added to the group.');
		console.info(result);
		return result.status;
	}
}

export async function addToGroupFromWebSite(participants: Participant[]) {
	let added = Array<Participant>();
	let unAdded = Array<Participant>();
	let usersWithInvalidPhone = Array<Object>();

	console.info('[INFO] : Whatsapp : Users are being added to the group...');

	const group = await client.getGroupChat(process.env.WHATSAPP_GROUP_NAME);

	if (group != undefined) console.log(getGroupPhones(group));
	console.log('---------------------');

	participants.forEach(async (participant) => {
		if (group) {
			const doNotAdd = ['905335692929', '905395052251', '905357846459'];

			const groupPhones = getGroupPhones(group);
			const phone = fixPhoneNumber(participant.phone ?? '');
			const isInGroup = groupPhones.includes(phone);
			const isDoNotAdd = doNotAdd.includes(phone);

			const userForLogging = {
				name: participant.name,
				phone: participant.phone,
				fixedPhone: phone,
				isInGroup: isInGroup,
			};

			if (!isInGroup && !isDoNotAdd) {
				usersWithInvalidPhone.push(userForLogging);
				const obj = await group.addParticipants([phone.serialized()]);
				console.log(obj);
				console.log(
					'ATATATATATATATATATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
				);
				added.push(participant);
				unAdded.push(participant);
			}
		}
	});

	console.info('[INFO] : Whatsapp : Users have been added to the group.');

	printNewParticipants(added, unAdded, usersWithInvalidPhone);
}

function printNewParticipants(
	added: Participant[],
	unAdded: Participant[],
	usersWithInvalidPhone: Object[]
) {
	const successfulAdd = 'Gruba Eklenen Üyeler';
	const successfulAddEnd = '--------------------';
	const unsuccessfulAdd = 'Gruba Eklenemeyen Üyeler';
	const unsuccessfulAddEnd = '------------------------';
	const usersWithInvalidPhoneText = 'Grupta olmayan kullanıcılar';
	const usersWithInvalidPhoneEndText = '---------------------------';
	const tre = '--------------------------------';

	console.log('\n');

	console.log(chalk.green(tre, successfulAdd, tre));
	console.info(added);
	console.log(chalk.green(tre, successfulAddEnd, tre));

	console.log('\n');

	console.log(chalk.red(tre, unsuccessfulAdd, tre));
	console.info(unAdded);
	console.log(chalk.red(tre, unsuccessfulAddEnd, tre));

	console.log('\n');

	console.log(chalk.yellow(tre, usersWithInvalidPhoneText, tre));
	console.info(usersWithInvalidPhone);
	console.log(chalk.yellow(tre, usersWithInvalidPhoneEndText, tre));
}
