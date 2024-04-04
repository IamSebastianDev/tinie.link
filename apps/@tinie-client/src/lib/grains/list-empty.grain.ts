/** @format */

import { derived } from '@grainular/nord';
import { urlList } from './url-list.grain';

export const listEmpty = derived(urlList, (list) => list.length === 0);
