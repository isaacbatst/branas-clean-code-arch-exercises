export abstract class DomainEvent<T> {
	abstract name: string;

	constructor(
		readonly payload: T,
	) {}
}
