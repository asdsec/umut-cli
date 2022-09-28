export class Participant {
	name?: string;
	department?: string;
	email?: string;
	phone?: string;
	date?: string;

	constructor(values: Array<string>) {
		this.name = values[0];
		this.department = values[1];
		this.email = values[2];
		this.phone = values[3];
		this.date = values[4];
	}
}
