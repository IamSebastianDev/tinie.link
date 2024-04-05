/** @format */

import { createComponent } from '@grainular/nord';
import background from '../../../assets/images/hero.webp';
import { shrinkHero } from '../../directives/shrink-hero.directive';

export const Hero = createComponent((html, { $children }) => {
    return html`<div class="hero relative bg-zinc-950 w-full py-16" ${shrinkHero('h-screen')}>
        <img class="absolute object-cover w-full h-full object-top" src="${background}" />
        ${$children}
    </div>`;
});

Hero.setStyle((css) => {
    return css`
        .hero {
            display: grid;
            grid-template-rows: 35vh 25vh;
        }
    `;
});
