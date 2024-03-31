/** @format */

import '../assets/reset.css';
import '../assets/app.css';
import { createComponent, render } from '@grainular/nord';
import { TopNavigation } from '../lib/components/navigation/top-navigation.component';
import { Hero } from '../lib/components/hero/hero.component';

const App = createComponent((html) => {
    return html`
        <!-- Navigation Components -->
        ${TopNavigation({})}
        <!-- Hero Components -->
        ${Hero({})}
        <!-- Input Component -->
        <div></div>
        <!-- Sidebar Component -->
        <div></div>
        <!-- Footer Component -->
    `;
});

render(App, { target: document.querySelector('main#app') });
