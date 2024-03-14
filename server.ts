/** @format */

import { Router } from 'express';
import { DB } from './db';
import base62 from 'base62';
import { UrlEntry } from './model';
import { Zookeeper } from './zookeeper';
export const server = Router();
const db = DB<UrlEntry>('./storage/server.storage.json');

// Convert number to base62 string
const convertNumberToBase62 = (number: number): string => {
	return base62.encode(number);
};

let range: number[] | null = null;
const getNewRange = async () => {
	const zookeeperResponse = await Zookeeper.get();
	const { end, start } = zookeeperResponse;
	range = Array(end - start)
		.fill(null)
		.map((_, idx) => idx + start);
};

// Get Long URL from Short URL
server.get('/:short', async (req, res) => {
	const entry = await db.get('short_url', req.params.short);

	if (!entry) {
		return res.status(404).send();
	}

	return res.status(301).redirect(entry.long_url);
});

// Create Short URL from Long URL
server.post('/create-url', async (req, res) => {
	const { long_url } = req.body;

	if (!long_url) {
		return res.status(400).send();
	}

	if (!range || range.length === 0) {
		await getNewRange();
	}

	const numberToConvert = range?.shift()!;
	const short_url = convertNumberToBase62(numberToConvert);

	if (!short_url) {
		return res.status(500).send();
	}

	const entry = { short_url, long_url, created_at: new Date(), visited: 0 };
	const inserted = await db.create(entry);

	if (!inserted) {
		return res.status(500).send();
	}

	return res.status(201).json({ short_url: inserted.short_url });
});
