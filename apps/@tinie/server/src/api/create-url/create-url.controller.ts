/** @format */

import { t } from 'elysia';
import type { App } from '../../bootstrap';
import { CreateUrlService } from './create-url.service';
import { Base62Service } from '../../lib/base62.service';
import { RangeService } from '../../lib/range.service';

export const CreateUrlController = (app: App) =>
    app.group('create-url/', (app) =>
        app
            .decorate({
                CreateUrlService: CreateUrlService(),
                Base62Service: Base62Service(),
                RangeService: RangeService(),
            })
            .post(
                '/',
                async ({ CreateUrlService, Base62Service, RangeService, body }) => {
                    const short_url = Base62Service.convert(await RangeService.getNumber());
                    return await CreateUrlService.create(body.long_url, short_url);
                },
                {
                    // validation
                    body: t.Object({
                        long_url: t.String({
                            description: 'The URL that is tiniefied.',
                        }),
                    }),
                },
            ),
    );
