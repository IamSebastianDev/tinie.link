/** @format */

import '../assets/styles/reset.css';
import '../assets/styles/app.css';
import '@fontsource/montserrat';
import '@fontsource/raleway';
import { createComponent, render } from '@grainular/nord';
import { TopNavigation } from '../lib/components/navigation/top-navigation.component';
import { Hero } from '../lib/components/hero/hero.component';
import { Footer } from '../lib/components/footer/footer.component';

const App = createComponent((html) => {
    return html`
        <!-- Navigation Components -->
        ${TopNavigation({})}
        <!-- Hero Components -->
        ${Hero({})}
        <!-- Footer Component -->
        ${Footer({})}
    `;
});

render(App, { target: document.querySelector('main#app') });
