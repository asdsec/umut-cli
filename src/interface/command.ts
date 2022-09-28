import { Argv } from 'yargs';

export interface Command {
	handle(yargs: Argv<{}>): void;
}
