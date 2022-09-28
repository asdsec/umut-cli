interface Command {
	name: string;
	description: string;
	flags: Set<Flag>;
}

interface Flag {
	name: string;
	description: string;
	alias?: string;
	type: Types;
	default?: Types;
}

type Types = boolean | string | number;
