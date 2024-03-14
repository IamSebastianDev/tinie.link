/** @format */

export type UrlEntry = {
	short_url: string;
	long_url: string;
	created_at: Date;
	visited: number;
};

export type ZookeeperEntry = {
	start: number;
	end: number;
	created_at: Date;
};
