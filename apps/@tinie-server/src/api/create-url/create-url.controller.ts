/** @format */

import { InternalServerError, t } from 'elysia';
import type { App } from '../../bootstrap';
import { CreateUrlService } from './create-url.service';
import { Base62Service } from '../../lib/base62.service';
import { RangeService } from '../../lib/range.service';

export const CreateUrlController = (app: App) =>
    app.group('create-url', (app) =>
        app
            .decorate({
                CreateUrlService: CreateUrlService(),
                Base62Service: Base62Service(),
                RangeService: RangeService(),
            })
            .post(
                '/',
                async ({ CreateUrlService, Base62Service, RangeService, body, set }) => {
                    const short_url = Base62Service.convert(await RangeService.getNumber());
                    const result = await CreateUrlService.create(body.long_url, short_url);

                    if (!result) {
                        throw new InternalServerError(`Oh no, something went wrong.`);
                    }

                    set.status = 201;
                    return result;
                },
                {
                    // validation
                    body: t.Object({
                        long_url: t.String({
                            description: 'The URL that will be shortened.',
                        }),
                    }),
                    detail: {
                        responses: {
                            '201': {
                                description: 'Redirect the User to the associated long URL.',
                            },
                            '422': {
                                description: 'Response returned when the validation of the long_url parameter failed.',
                            },
                            '500': {
                                description: 'Returned when the URL could not be created for a technical Reason.',
                            },
                        },
                        description: 'Creates the shortened URL from the provided long URL.',
                    },
                },
            ),
    );
