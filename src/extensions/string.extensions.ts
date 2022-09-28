interface String {
	parseBool(): boolean;
	serialized(): string;
}

String.prototype.parseBool = function () {
	return this == 'true';
};

String.prototype.serialized = function () {
	return this + '@c.us';
};
