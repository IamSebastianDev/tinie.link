/** @format */

import '../../assets/styles/reset.css';
import '../../assets/styles/app.css';
import { createComponent, grain, readonly, render } from '@grainular/nord';
import { Footer } from '../../lib/components/footer/footer.component';
import { Hero } from '../../lib/components/hero/hero.component';
import { TopNavigation } from '../../lib/components/navigation/top-navigation.component';
import { Button } from '../../lib/components/ui/button/button.component';

const App = createComponent((html) => {
    return html`
        <!-- Navigation Components -->
        ${TopNavigation({})}
        <!-- Hero Components -->
        ${Hero(
            { listEmpty: readonly(grain(true)) },
            (html) =>
                html` <div
                        class="self-center z-10 flex flex-col justify-center items-center max-w-7xl w-full m-auto text-center px-10 max-xl:max-w-4xl gap-5"
                    >
                        <h1
                            class="font-bold py-4 text-7xl bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text"
                        >
                            Oooops...
                        </h1>
                        <h3 class="text-zinc-200 tracking-wider text-2xl font-semibold">
                            This isn't the Link you're looking for.
                        </h3>
                    </div>
                    <!-- Input -->
                    <div class="z-10 self-center">
                        ${Button(
                            {
                                onClick: () => (window.location.href = '/'),
                                classes:
                                    'mx-auto rounded-full px-8 py-3 text-xl bg-sky-800 hover:bg-sky-600 text-zinc-300 active:bg-sky-400 border-4 border-zinc-900',
                            },
                            (html) => html`Shorten Some Links Now!`,
                        )}
                    </div>`,
        )}
        <!-- Footer Component -->
        ${Footer({})}
    `;
});

render(App, { target: document.querySelector('main#app') });
