import { ArgumentsCamelCase, InferredOptionTypes } from 'yargs';
import * as whatsapp from '../../service/whatsapp.service';
import * as participantService from '../../service/participants.service';
import { Participant } from '../../model/participant.model';

const cmd = {
	command: 'add',
	desc: 'add phones [phones..] to specified group [group].',
	builder: {
		auto: {
			alias: 'a',
			description: 'Gets the phone numbers automatically.',
			default: false,
			boolean: true,
		},
		group: {
			alias: 'g',
			description: 'The group which the phones will be added.',
			default: 'Robot Topluluğu 22-23',
			string: true,
		},
		phones: {
			alias: 'p',
			description: 'The phones which will be added.',
			default: Array<string>(),
			array: true,
		},
	},
	handler: handlerFunction,
};

async function handlerFunction(argv: AddCommandArgvType) {
	whatsapp.login();
	var result: number | undefined;
	if (argv.auto) {
		await whatsapp.client.run<Promise<void>>(async () => {
			const participants = await participantService.getParticipants();
			// console.log(participants);
			// const participants = [new Participant(['', '', '', '05452722055', ''])];
			await whatsapp.addToGroupFromWebSite(participants);
			process.exit(0);
		});
	} else {
		result = await whatsapp.client.run<Promise<number | undefined>>(
			async () => {
				return await whatsapp.addToGroup(argv.phones, argv.group);
			}
		);
	}
	await whatsapp.client.initialize();
	if (result) console.log(result);
}

type AddCommandArgvType = ArgumentsCamelCase<
	InferredOptionTypes<{
		auto: {
			alias: string;
			description: string;
			default: boolean;
			boolean: boolean;
		};
		group: {
			alias: string;
			description: string;
			default: string;
			string: boolean;
		};
		phones: {
			alias: string;
			description: string;
			default: Array<string>;
			array: boolean;
		};
	}>
>;

export const command = cmd.command;
export const desc = cmd.desc;
export const builder = cmd.builder;
export const handler = cmd.handler;
