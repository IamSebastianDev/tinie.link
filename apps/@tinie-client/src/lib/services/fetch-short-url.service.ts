/** @format */

import { grain, readonly } from '@grainular/nord';
import { JSendResponse, UrlModel } from '@tinie/models';
import { urlList } from '../grains/url-list.grain';

class FetchShortUrlService {
    /**
     * Abort controller
     */

    private abortController: AbortController | null = null;
    private abortPreviousRequest() {
        if (this.abortController) {
            this.abortController.abort();
        }

        this.abortController = new AbortController();
        return this.abortController;
    }

    fetchShortUrl(longUrl: string) {
        const url = grain<null | UrlModel>(null);
        const { signal } = this.abortPreviousRequest();

        const body = JSON.stringify({ long_url: longUrl });
        fetch('/api/v1/create-url/', { method: 'POST', body, signal, headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.json())
            .then(({ data, status }: JSendResponse<UrlModel>) => {
                // When the request is successful, add the data to the URL grain
                if (status === 'success') {
                    url.set(data);
                    urlList.update((cur) => [data, ...cur]);
                }

                // @todo -> handle error states
            });

        return readonly(url);
    }
}

export const fetchShortUrlService = new FetchShortUrlService();
