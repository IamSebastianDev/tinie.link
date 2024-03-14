/** @format */

import { DB } from './db';
import { ZookeeperEntry } from './model';

const db = DB<ZookeeperEntry>('./storage/zookeeper.storage.json');
export const zookeeper = (range: number) => {
	const get = async () => {
		// check db for last number
		const [currentRange] =
			(await db.getAll())?.sort((a, b) => (a.end > b.end ? -1 : 1)) ?? [];

		// generate new range
		const newRange: ZookeeperEntry = {
			start: (currentRange?.end ?? 0) + 1,
			end: (currentRange?.end ?? 0) + range,
			created_at: new Date(),
		};

		// save range to db
		const inserted = await db.create(newRange);

		if (inserted) {
			return inserted;
		}

		throw new Error(`Mist`);
	};

	return {
		get,
	};
};

export const Zookeeper = zookeeper(1000);
