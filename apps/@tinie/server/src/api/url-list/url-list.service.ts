/** @format */

import { getUrlList } from '@tinie/dynamo';

export const UrlListService = () => {
    return {
        list: async (items: number) => {
            return await getUrlList(items);
        },
    };
};
