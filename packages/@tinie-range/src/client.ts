/** @format */

import type { JSendResponse } from '@tinie/models';
import './environment';

const connect = process.env.WORKER_CONNECT;

class Client {
    constructor(private connection: string) {}

    private async retry<T>(exec: () => Promise<T>, maximumRetry: number = 3, delay: number = 100): Promise<T> {
        let attempt = 0;
        while (attempt < maximumRetry) {
            console.log(`Attempt to reach Zookeeper ${attempt}`);
            try {
                // Attempt to execute the passed function
                return await exec();
            } catch (error) {
                attempt++;
                if (attempt >= maximumRetry) {
                    // If we've reached the max attempts, throw the error
                    throw error;
                }
                // Wait for the exponential backoff delay before the next attempt
                await this.sleep(delay * Math.pow(2, attempt - 1));
            }
        }
        throw new Error('Maximum retry attempts reached');
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async status(): Promise<boolean> {
        const response = await fetch(`${this.connection}/ready`);
        const { status, data } = (await response.json()) as JSendResponse<{ ok: boolean }>;

        if (status === 'success') {
            return data.ok;
        }

        return false;
    }

    async getRange(): Promise<number | null> {
        const fetchRangeFromWorker = async () => {
            const response = await fetch(this.connection);
            const { status, data } = (await response.json()) as JSendResponse<{ allocatedRangeId: number }>;

            if (status === 'success') {
                return data.allocatedRangeId;
            }

            return null;
        };

        return this.retry(fetchRangeFromWorker, 10, 100);
    }
}

export const client = new Client(connect);
