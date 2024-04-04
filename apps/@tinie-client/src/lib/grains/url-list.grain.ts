/** @format */

import { grain } from '@grainular/nord';
import { UrlModel } from '@tinie/models';

const initial = window.localStorage.getItem('tinie_urls') ?? '[]';
export const urlList = grain<UrlModel[]>(JSON.parse(initial));
urlList.subscribe((list) => {
    window.localStorage.setItem('tinie_urls', JSON.stringify(list));
});
