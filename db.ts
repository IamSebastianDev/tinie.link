/** @format */
import { resolve, join } from 'path';
import { readFile, writeFile } from 'node:fs/promises';

export const DB = <T>(location: string) => {
	const file = resolve(join(process.cwd(), location));

	const get = async <K extends keyof T, V extends T[K]>(
		key: K,
		value: V
	): Promise<T | null> => {
		try {
			const content = await readFile(file, 'utf-8');
			const data: Array<T> = JSON.parse(content);

			return data.find((entry) => entry[key] === value) ?? null;
		} catch (e) {
			return null;
		}
	};
	const create = async (newData: T) => {
		try {
			const content = await readFile(file, 'utf-8');
			const data: Array<T> = JSON.parse(content);

			const updated = [...data, newData];

			await writeFile(file, JSON.stringify(updated), 'utf-8');

			return newData;
		} catch (e) {
			return null;
		}
	};

	const getAll = async () => {
		try {
			const content = await readFile(file, 'utf-8');
			const data: Array<T> = JSON.parse(content);

			return data;
		} catch (e) {
			return null;
		}
	};

	return {
		get,
		create,
		getAll,
	};
};
