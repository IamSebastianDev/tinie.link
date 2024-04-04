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

const App = createComponent((html) => {
    return html`
        <!-- Navigation Components -->
        ${TopNavigation({})}
        <!-- Hero Components -->
        ${Hero({})}
        <!-- List -->
        ${List({})}
        <!-- Footer Component -->
        ${Footer({})}
    `;
});

render(App, { target: document.querySelector('main#app') });
