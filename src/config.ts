import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
	case 'dev':
		configDotenv({
			path: resolve(__dirname, '../.env'),
		});
		break;
	// case 'test':
	// 	configDotenv({
	// 		path: resolve(__dirname, '../.env.test'),
	// 	});
	// 	break;
	default:
		throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

function throwIfNot<T, K extends keyof T>(
	obj: Partial<T>,
	prop: K,
	msg?: string
): T[K] {
	if (obj[prop] === undefined || obj[prop] === null) {
		throw new Error(msg || `Environment is missing variable ${String(prop)}`);
	} else {
		return obj[prop] as T[K];
	}
}

const list = [
	'STUDENT_NO',
	'STUDENT_PASSWORD',
	'AUTH_URL',
	'TARGET_URL',
	'WHATSAPP_GROUP_NAME',
	'COOKIES_PATH',
	'AMOUNT_PATH',
	'ENCODING',
];

// validate that the expected ENV variables defined!
list.map((v) => throwIfNot(process.env, v));

export interface IProcessEnv {
	STUDENT_NO: string;
	STUDENT_PASSWORD: string;
	AUTH_URL: string;
	TARGET_URL: string;
	WHATSAPP_GROUP_NAME: string;
	COOKIES_PATH: string;
	AMOUNT_PATH: string;
	ENCODING: string;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends IProcessEnv {}
	}
}
