import { ArgumentsCamelCase, Argv } from 'yargs';

const whatsapp_commands = 'whatsapp-commands';

const cmd = {
	usage: 'whatsapp <command>',
	command: 'whatsapp <command>',
	desc: 'Use Whatsapp',
	builder: builderFunction,
	handler: handlerFunction,
};

function builderFunction(yargs: Argv<{}>) {
	return yargs.commandDir(whatsapp_commands).demandCommand().help().strict();
}

function handlerFunction(argv: ArgumentsCamelCase<{}>) {}

export const usage = cmd.usage;
export const command = cmd.command;
export const desc = cmd.desc;
export const builder = cmd.builder;
export const handler = cmd.handler;
