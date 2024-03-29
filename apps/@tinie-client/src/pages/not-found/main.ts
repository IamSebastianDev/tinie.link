/** @format */

import '../../assets/reset.css';
import '../../assets/app.css';
import { createComponent, render } from '@grainular/nord';

const App = createComponent((html) => {
    return html`<h1>Not Found</h1>`;
});

render(App, { target: document.querySelector('main#app') });
