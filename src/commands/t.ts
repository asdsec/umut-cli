import { ArgumentsCamelCase, Argv } from 'yargs';
import * as service from '../service/participants.service';

const cmd = {
	usage: 't <command>',
	command: 't',
	desc: 'Test the website',
	builder: {},
	handler: handlerFunction,
};

async function handlerFunction(argv: ArgumentsCamelCase<{}>) {
	await service.test();
}

export const usage = cmd.usage;
export const command = cmd.command;
export const desc = cmd.desc;
export const builder = cmd.builder;
export const handler = cmd.handler;
