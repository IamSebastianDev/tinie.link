/** @format */

import '../assets/styles/reset.css';
import '../assets/styles/app.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/800.css';
import '@fontsource/quicksand';
import { createComponent, render } from '@grainular/nord';
import { TopNavigation } from '../lib/components/navigation/top-navigation.component';
import { Hero } from '../lib/components/hero/hero.component';
import { Footer } from '../lib/components/footer/footer.component';
import { List } from '../lib/components/list/list.component';
import { PopupOutlet } from '../lib/components/popup/popup-outlet.component';
import { Input } from '../lib/components/shortening/input.component';
import { Result } from '../lib/components/shortening/result.component';
import { fetchShortUrlService } from '../lib/services/fetch-short-url.service';
import { popupService } from '../lib/services/popup.service';
import { listEmpty } from '../lib/grains/list-empty.grain';
import { ToastOutlet } from '../lib/components/toast/toast-outlet.component';

const App = createComponent((html) => {
    const onSubmit = (short: string) => {
        fetchShortUrlService.fetchShortUrl(short).subscribe((result) => {
            // Handle OK response
            if (result) {
                popupService.open(Result, { url: result });
            }
        }, false);
    };

    return html`
        <!-- Navigation Components -->
        ${TopNavigation({})}
        <!-- Hero Components -->
        ${Hero(
            { listEmpty },
            (html) =>
                html` <div
                        class="self-center z-10 flex flex-col justify-center items-center max-w-7xl w-full m-auto text-center px-10 max-xl:max-w-4xl gap-5"
                    >
                        <h1
                            class="font-bold py-4 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text max-sm:text-3xl max-lg:text-5xl text-7xl"
                        >
                            Life is Too Short for Long Links
                        </h1>
                        <h3 class="text-zinc-200 tracking-wider text-lg max-xl:text-sm font-semibold">
                            With Tinie, enjoy open-source, cloud-powered link sharing: always free, always private,
                            incredibly fast. 🚀
                        </h3>
                    </div>
                    <!-- Input -->
                    <div class="z-10 self-center">${Input({ onSubmit })}</div>`,
        )}
        <!-- List -->
        ${List({})}
        <!-- Footer Component -->
        ${Footer({})}
        <!-- Outlet -->
        ${PopupOutlet({})} ${ToastOutlet({})}
    `;
});

render(App, { target: document.querySelector('main#app') });
