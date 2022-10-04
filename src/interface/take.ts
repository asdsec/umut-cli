import chalk from 'chalk';
import { Argv, ArgumentsCamelCase, InferredOptionTypes } from 'yargs';
import { Command } from '../interface/command';
import { saveAmount } from '../utility/file.utils';

const command = {
	name: 'take',
	description: 'Takes the new participants to the whatsapp group.',
	builder: {
		send: {
			alias: 's',
			description: 'Whether send a email to participant.',
			default: false,
			boolean: true,
		},
	},
	handler: run,
};

class Take implements Command {
	handle = function (yargs: Argv<{}>) {
		yargs.command(
			command.name,
			command.description,
			command.builder,
			command.handler
		);
	};
}

function run(
	argv: ArgumentsCamelCase<
		InferredOptionTypes<{
			send: {
				alias: string;
				description: string;
				default: boolean;
				boolean: boolean;
			};
		}>
	>
): void {
	if (argv.send) {
		// startWhatsapp();
	} else {
		// startWhatsapp();
		console.log(chalk.blue(email.title));
		console.log(chalk.yellow(email.text));
	}
}

const email = {
	title: 'Başarısız Operasyon İçin Email:',

	text: `
	------------------------
	
	Uludağ Üniversitesi Robot Topluluğu
	
	Robot topluluğunun whatsapp grubuna eklenme sürecinde bir hata oluştu.
	
	Gruba Katıl: https://add.to.whatsapp.com
	
	------------------------
	`,
};

const take = new Take();

export default take;
