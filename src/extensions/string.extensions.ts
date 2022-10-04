interface String {
	parseBool(): boolean;
	serialized(): string;
}

String.prototype.parseBool = function (): boolean {
	return this == 'true';
};

String.prototype.serialized = function (): string {
	return this + '@c.us';
};
