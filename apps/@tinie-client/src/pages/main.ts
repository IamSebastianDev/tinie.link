/** @format */

import '../assets/reset.css';
import '../assets/app.css';
import { createComponent, render } from '@grainular/nord';

const App = createComponent((html) => {
    return html`<h1>Tinie.xyz</h1>`;
});

render(App, { target: document.querySelector('main#app') });
