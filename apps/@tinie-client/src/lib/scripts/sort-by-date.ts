/** @format */

import { UrlModel } from '@tinie/models';

export const sortByDate = (dir: -1 | 1) => (a: UrlModel, b: UrlModel) =>
    (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir;
