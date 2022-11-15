import csvParser from 'csv-parser';
import fs from 'fs';

export class CsvParser<T extends Record<string, unknown>> {
	private readonly parsed: T[];

	constructor() {
		this.parsed = [];
	}

	async parse(path: string): Promise<T[]> {
		return new Promise((resolve, reject) => {
			fs.createReadStream(path)
				.pipe(csvParser())
				.on('data', data => {
					this.parsed.push(data);
				})
				.on('end', () => {
					resolve(this.parsed);
				})
				.on('error', error => {
					reject(error);
				});
		});
	}
}
