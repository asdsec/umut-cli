import dotenv from 'dotenv';
import { Client, GroupChat, GroupParticipant } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { getParticipants } from './participants.service';
import { Participant } from '../model/participant.model';
import { checkIsValid, fixPhoneNumber } from '../utility/fixPhoneNumber';
import chalk from 'chalk';

dotenv.config();

const client = new Client({});

export function startWhatsapp() {
	const qr = 'qr';
	const ready = 'ready';

	client.on(qr, (qr) => {
		qrcode.generate(qr, { small: true });
	});

	client.on(ready, async () => {
		const participants = await getParticipants();
		addParticipantsIfNotInGroup(participants);
	});

	client.initialize();
}

async function addParticipantsIfNotInGroup(participants: Participant[]) {
	const chats = await client.getChats();
	let added = Array<Participant>();
	let unAdded = Array<Participant>();

	const chat = chats.find(
		(chat) => chat.name === process.env.WHATSAPP_GROUP_NAME
	);

	participants.forEach((participant) => {
		if (chat?.isGroup) {
			const group = chat as GroupChat;

			const users = group.participants;
			const userPhones = getGroupsPhones(users);

			const phone = fixPhoneNumber(participant.phone ?? '');
			const isInGroup = userPhones.includes(phone);
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
	const unsuccessfulAdd = 'Gruba Eklenemeyen Üyeler::';

	if (added.length !== 0) {
		console.log(chalk.blue(successfulAdd), chalk.green(added));
	}
	if (unAdded.length !== 0) {
		console.log(chalk.blue(unsuccessfulAdd), chalk.red(unAdded));
	}
}

function getGroupsPhones(participants: GroupParticipant[]) {
	return participants.map((user) => {
		const id = user['id'];
		const phone = id['user'];
		return phone;
	});
}
