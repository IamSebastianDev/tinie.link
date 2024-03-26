/** @format */

import { t } from 'elysia';
import type { App } from '../../bootstrap';
import { UrlListService } from './url-list.service';

export const UrlListController = (app: App) =>
    app.group('/url', (app) =>
        app
            .decorate({
                UrlListService: UrlListService(),
            })
            .get('/', ({ UrlListService, query: { items } }) => UrlListService.list(parseInt(items ?? '100')), {
                query: t.Optional(
                    t.Object({
                        items: t.Optional(
                            t.String({ description: 'Number of items to fetch from the DataBase', default: '100' }),
                        ),
                    }),
                ),
            }),
    );
