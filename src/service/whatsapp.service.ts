import dotenv from 'dotenv';
import { Client, GroupChat } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { Participant } from '../model/participant.model';
import { checkIsValid, fixPhoneNumber } from '../utility/fixPhoneNumber';
import chalk from 'chalk';

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
			result = await onReady();
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
		qrcode.generate(qr, { small: true });
	});
}

export async function addToGroup(
	participantIds: string[],
	groupName: string
): Promise<number | undefined> {
	const group = await client.getGroupChat(groupName);

	if (group) {
		const ids = participantIds.map((phone) => {
			return fixPhoneNumber(phone).serialized();
		});
		const result = await group.addParticipants(ids);
		console.info(result);
		return result.status;
	}
}

export async function addToGroupFromWebSite(participants: Participant[]) {
	let added = Array<Participant>();
	let unAdded = Array<Participant>();

	const group = await client.getGroupChat(process.env.WHATSAPP_GROUP_NAME);

	participants.forEach((participant) => {
		if (group) {
			const groupPhones = getGroupPhones(group);
			const phone = fixPhoneNumber(participant.phone ?? '');
			const isInGroup = groupPhones.includes(phone);
			if (!isInGroup) {
				if (checkIsValid(phone)) {
					group.addParticipants([phone.serialized()]);
					added.push(participant);
				} else {
					unAdded.push(participant);
				}
			}
		}
	});

	printNewParticipants(added, unAdded);
}

function printNewParticipants(added: Participant[], unAdded: Participant[]) {
	const successfulAdd = 'Gruba Eklenen Üyeler:';
	const unsuccessfulAdd = 'Gruba Eklenemeyen Üyeler:';

	if (added.length !== 0) {
		console.log(chalk.blue(successfulAdd), chalk.green(added));
	}
	if (unAdded.length !== 0) {
		console.log(chalk.blue(unsuccessfulAdd), chalk.red(unAdded));
	}
}
