/** @format */

import '../../assets/styles/reset.css';
import '../../assets/styles/app.css';
import { createComponent, render } from '@grainular/nord';

const App = createComponent((html) => {
    return html`<h1>Not Found</h1>`;
});

render(App, { target: document.querySelector('main#app') });
